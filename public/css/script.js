const pwShowHide = document.querySelectorAll(".eye-icon");
const signupLink = document.querySelector(".link-signup-link");
const loginLink = document.querySelector(".login-link");

// pwShowHide.forEach(eyeIcon => {
//     eyeIcon.addEventListener("click", () => {
//         let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

//         pwFields.forEach(password => {
//             if (password.type === "password") {
//                 password.type = "text";
//                 eyeIcon.classList.replace("bx-hide", "bx-show");
//                 return;
//             }
//             password.type = "password";
//             eyeIcon.classList.replace("bx-show", "bx-hide");
//         });
//     });
// });

signupLink.addEventListener("click", e => {
    e.preventDefault(); // Preventing form submit
    document.querySelector(".forms").classList.add("show-signup");
});

loginLink.addEventListener("click", e => {
    e.preventDefault(); // Preventing form submit
    document.querySelector(".forms").classList.remove("show-signup");
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

