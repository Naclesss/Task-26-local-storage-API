function validateUser(e) {
  e.preventDefault();
  let usernameValue = document.forms["myForm"]["username"].value;
  let passwordValue = document.forms["myForm"]["password"].value;

  const usernameValid = /^[a-zA-Z]+$/.test(usernameValue);
  const passwordValid = /^[0-9]+$/.test(passwordValue);

  document.getElementById("username-error").innerHTML = "";
  document.getElementById("password-error").innerHTML = "";

  let isValid = true;

  if (usernameValue === "") {
    document.getElementById("username-error").innerHTML =
      "Username is required.";
    isValid = false;
  } else if (!usernameValid) {
    document.getElementById("username-error").innerHTML =
      "Username must contain only letters.";
    isValid = false;
  }

  if (passwordValue === "") {
    document.getElementById("password-error").innerHTML =
      "Password is required.";
    isValid = false;
  } else if (!passwordValid) {
    document.getElementById("password-error").innerHTML =
      "Password must contain only numbers.";
    isValid = false;
  } else if (passwordValue.length < 6) {
    document.getElementById("password-error").innerHTML =
      "Password must be at least 6 characters.";
    isValid = false;
  }

  if (!isValid) {
    return false;
  }

  let storedUsers = JSON.parse(localStorage.getItem("Users")) || [];
  let userExists = false;
  let currentUser = null;

  for (let i = 0; i < storedUsers.length; i++) {
    let user = storedUsers[i];

   
    if (user.username === usernameValue && user.password === passwordValue) {
      userExists = true;
      currentUser = user; 
      break;
    }
  }


  if (!userExists) {
    document.getElementById("usercheck-error").innerHTML =
      "Invalid username or password.";
    return false;
  }

  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  window.location.href = "welcome.html";
  return true;
  
}

const themeToggleButton = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.body.classList.add(currentTheme);
}

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark-mode");
  } else {
    localStorage.setItem("theme", "light-mode");
  }
});
