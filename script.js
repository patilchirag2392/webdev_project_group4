
const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;


function showErrorMessage(elementId, message) {
  const errorMsg = document.getElementById(elementId);
  if (errorMsg) {
    errorMsg.innerText = message;
  }
}


function clearErrorMessage(elementId) {
  const errorMsg = document.getElementById(elementId);
  if (errorMsg) {
    errorMsg.innerText = '';
  }
}


document.getElementById("userSignupForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  
  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmSignupPassword").value.trim();

  
  clearErrorMessage("signupErrorMessage");

 
  if (!username) {
    showErrorMessage("signupErrorMessage", "Username cannot be empty.");
    return;
  }

  
  if (!emailRegex.test(email)) {
    showErrorMessage("signupErrorMessage", "Please use a valid @northeastern.edu email address.");
    return;
  }

  
  if (!passwordRegex.test(password)) {
    showErrorMessage(
      "signupErrorMessage",
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
    );
    return;
  }

  
  if (password !== confirmPassword) {
    showErrorMessage("signupErrorMessage", "Passwords do not match. Please try again.");
    return;
  }

 
  alert(`Welcome, ${username}! Your account has been created successfully.`);
  window.location.href = "login.html"; 
});

document.getElementById("loginForm")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  clearErrorMessage("loginErrorMessage");

  let loginErrorContainer = document.getElementById("loginErrorMessage");
  if (!loginErrorContainer) {
    loginErrorContainer = document.createElement("p");
    loginErrorContainer.id = "loginErrorMessage";
    loginErrorContainer.className = "text-danger mt-3";
    document.querySelector(".card-body").appendChild(loginErrorContainer);
  }

  if (!emailRegex.test(email)) {
    showErrorMessage("loginErrorMessage", "Please use a valid @northeastern.edu email address.");
    return;
  }

  if (!passwordRegex.test(password)) {
    showErrorMessage(
      "loginErrorMessage",
      "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
    );
    return;
  }

  alert("Login Successful!");
  window.location.href = "index.html"; 
}); 
