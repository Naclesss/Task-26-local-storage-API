function validateInputs(e) {
  e.preventDefault();

  let usernameValue = document.forms["myForm"]["username"].value;
  let passwordValue = document.forms["myForm"]["password"].value;
  let emailValue = document.forms["myForm"]["email"].value;

  const usernameValid = /^[a-zA-Z]+$/.test(usernameValue);
  const passwordValid = /^[0-9]+$/.test(passwordValue);
  const emailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue);

  document.getElementById("username-error").innerHTML = "";
  document.getElementById("password-error").innerHTML = "";
  document.getElementById("email-error").innerHTML = "";

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

  if (emailValue === "") {
    document.getElementById("email-error").innerHTML = "Email is required.";
    isValid = false;
  } else if (!emailValid) {
    document.getElementById("email-error").innerHTML = "Not a valid Email.";
    isValid = false;
  }

  let userArray = JSON.parse(localStorage.getItem("Users")) || [];


  const usernameExists = userArray.some(user => user.username === usernameValue);
  if (usernameExists) {
    document.getElementById("username-error").innerHTML = "Username already exists.";
    isValid = false;
  }

  const emailExists = userArray.some(user => user.email === emailValue);
  if (emailExists) {
    document.getElementById("email-error").innerHTML = "Email is already in use.";
    isValid = false;
  }



  if (!isValid) {
    return false;
  }




  
  const newUser = {
    username: usernameValue,
    password: passwordValue,
    email: emailValue
  };

  
  userArray.push(newUser);

  
  localStorage.setItem("Users", JSON.stringify(userArray));



  


  alert("Registration successful!");
  document.forms["myForm"].reset();
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
