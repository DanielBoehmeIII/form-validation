// Some code borrowed from "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation""
import "./style.css";

// --- DOM Elements ---
const country = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const passwordConfirmationField = document.getElementById(
  "password-confirmation",
);

// --- Postal Code Validation ---
function checkPostalCode() {
  const errorSpan = document.getElementById("postal-error");
  const constraints = {
    us: [
      "^(US-)?\\d{5}$",
      "American postal codes must have exactly 5 digits: e.g. US-19130 or 19130",
    ],
    uk: [
      "^(UK-)?[A-Z0-9]{5,7}$",
      "English postal codes must have 5 to 7 Alphanumerical characters",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-79023 or 79023",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-53412 or 53412",
    ],
    cn: [
      "^(CN-)?\\d{6}$",
      "Chinese postal codes must have exactly 6 digits: e.g. CN-694132 or 694132",
    ],
  };

  if (country.value !== "") {
    const countryValue = country.value;
    const constraint = new RegExp(constraints[countryValue][0], "");
    postalCodeField.setAttribute("altered", true);

    if (constraint.test(postalCodeField.value)) {
      postalCodeField.setCustomValidity("");
    } else {
      postalCodeField.setCustomValidity(constraints[countryValue][1]);
    }
    country.setAttribute("altered", true);
  } else {
    country.setAttribute("altered", false);
  }

  errorSpan.textContent = postalCodeField.validationMessage;
}

// --- Email Validation ---
function checkEmail() {
  const errorSpan = document.getElementById("email-error");
  const pattern = "^[^@]{1,256}@[a-zA-Z0-9.-]{1,60}\\.[a-z]{2,6}$";
  const messageFormat = [
    "Please enter an email with an @ symbol",
    "Please include a top-level domain",
  ];
  const constraint = new RegExp(pattern, "i");

  if (emailField.value !== "") {
    emailField.setAttribute("altered", true);
    if (constraint.test(emailField.value)) {
      emailField.setCustomValidity("");
    } else if (!emailField.value.includes("@")) {
      emailField.setCustomValidity(messageFormat[0]);
    } else {
      emailField.setCustomValidity(messageFormat[1]);
    }
    errorSpan.textContent = emailField.validationMessage;
  } else {
    emailField.setAttribute("altered", false);
  }
}

// --- Password Validation ---
function checkPassword() {
  const errorSpan = document.getElementById("password-error");
  const pattern = "^[a-zA-Z0-9.-!@#$%^&*()_+=]{12,128}";
  const messageFormat = [
    "Please enter a password between 12 and 128 characters",
    "Please enter a password with a special character",
  ];

  if (passwordField.value !== "") {
    passwordField.setAttribute("altered", true);
    if (passwordField.value.length < 12 || passwordField.value.length > 128) {
      passwordField.setCustomValidity(messageFormat[0]);
      passwordConfirmationField.setCustomValidity("");
    } else if (!/[!@#$%^&*()_\-+=]/.test(passwordField.value)) {
      passwordField.setCustomValidity(messageFormat[1]);
      passwordConfirmationField.setCustomValidity("");
    } else {
      passwordField.setCustomValidity("");
      passwordConfirmationField.setCustomValidity("");
    }
    passwordField.setAttribute("altered", true);
    errorSpan.textContent = passwordField.validationMessage;
  } else {
    passwordField.setAttribute("altered", false);
  }
}

// --- Password Confirmation ---
function checkPasswordConfirmation() {
  const errorSpan = document.getElementById("password-confirmation-error");
  const message = [
    "Please confirm your password",
    "Password confirmation doesn't match, please try again",
  ];
  if (
    passwordField.value !== passwordConfirmationField.value &&
    passwordConfirmationField.value === "" &&
    passwordConfirmationField.getAttribute("altered") === "true"
  ) {
    passwordConfirmationField.setAttribute("altered", true);
    passwordField.setCustomValidity("");
    passwordConfirmationField.setCustomValidity(message[0]);
    errorSpan.textContent = passwordConfirmationField.validationMessage;
  } else if (
    passwordField.value !== passwordConfirmationField.value &&
    passwordConfirmationField.value !== ""
  ) {
    passwordField.setCustomValidity("");
    passwordConfirmationField.setCustomValidity(message[1]);
    passwordConfirmationField.setAttribute("altered", true);
    errorSpan.textContent = passwordConfirmationField.validationMessage;
  } else {
    passwordField.setCustomValidity("");
    passwordConfirmationField.setCustomValidity("");
    passwordConfirmationField.setAttribute("altered", false);
    errorSpan.textContent = passwordConfirmationField.validationMessage;
  }
}

// --- Event Listeners ---
country.addEventListener("input", checkPostalCode); // re-check postal when country changes
postalCodeField.addEventListener("input", checkPostalCode);
emailField.addEventListener("input", checkEmail);
passwordField.addEventListener("input", checkPassword);
passwordConfirmationField.addEventListener("input", checkPasswordConfirmation);
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  checkPostalCode();
  checkEmail();
  checkPassword();
  checkPasswordConfirmation();

  if (!form.checkValidity()) {
    e.preventDefault();
    alert("invalid");
  } else {
    alert("valid");
  }
});
