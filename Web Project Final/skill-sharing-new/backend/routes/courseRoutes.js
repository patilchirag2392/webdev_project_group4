const express = require('express');
const Course = require('../models/Course');

const router = express.Router();




// Add Course
router.post('/add', async (req, res) => {
  const { title, description, price, videos, instructorId, userId } = req.body; // Include userId
  try {
    const course = new Course({ title, description, price, videos, instructorId, userId });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch Dashboard Courses
router.get('/dashboard', async (req, res) => {
  const { userId } = req.query; // Expect the userId in the query params
  try {
    const courses = await Course.find({ userId }); // Fetch courses belonging to the user
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard courses', error: error.message });
  }
});


// Remove a course from the dashboard
router.delete('/remove/:id', async (req, res) => {
  const { userId } = req.query; // Expect userId in the query params
  const courseId = req.params.id; // Get the course ID from the route

  try {
    const course = await Course.findOneAndDelete({ _id: courseId, userId }); // Delete only if userId matches
    if (!course) {
      return res.status(404).json({ message: 'Course not found or not associated with your dashboard' });
    }
    res.status(200).json({ message: 'Course removed from dashboard' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing course', error: error.message });
  }
});




// // Add Course
// router.post('/add', async (req, res) => {
//   const { title, description, price, videos, instructorId } = req.body;
//   try {
//     const course = new Course({ title, description, price, videos, instructorId });
//     await course.save();
//     res.status(201).json({ message: 'Course added successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



router.get('/get/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if the instructor is viewing their own course
      if (req.query.role === 'instructor' && course.instructorId.toString() !== req.query.userId) {
        return res.status(403).json({ message: 'You can only view courses you created.' });
      }
  
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

router.get('/get', async (req, res) => {
  const { userId, role } = req.query;

  try {
    console.log('Query Parameters:', { userId, role }); // Log query parameters
    let courses;

    if (role === 'instructor') {
      courses = await Course.find({ instructorId: userId });
      console.log('Filtered Courses for Instructor:', courses); // Log filtered courses
    } else {
      courses = await Course.find();
      console.log('All Courses for User:', courses); // Log all courses
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});


  
  
  

module.exports = router;
