// ====== LOGIN SCRIPT FOR SHMS ======

// Element references
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const usernameInput = document.getElementById('username');

// ====== RESTORE USERNAME AND CLEAR PASSWORD ON LOAD ======
window.addEventListener('load', () => {
  // Restore last entered username from localStorage (if available)
  const savedUsername = localStorage.getItem('savedUsername');
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }
  // Always clear password for safety
  passwordInput.value = '';
});

// ====== SHOW / HIDE PASSWORD ======
togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});

// ====== LOGIN LOGIC ======
const loginForm = document.getElementById('loginForm');

// Predefined users
const USERS = [
  {
    email: 'admin@gmail.com',
    password: 'admin',
    redirect: 'Hospital_Administrator/Home.html'
  },
  {
    email: 'ai.ml@gmail.com',
    password: 'aiml',
    redirect: 'AI_&_ML_Developer/Home.html'
  },
  {
    email:'patient@gmail.com',
    password:'patient',
    redirect:'Patient/Home.html'
  },
  {
    email:'insurance@gmail.com',
    password:'insurance',
    redirect:'InsuranceCompany/insurance-dashboard.html'
  }
 
];

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const enteredEmail = usernameInput.value.trim();
  const enteredPassword = passwordInput.value.trim();

  // Find a matching account
  const matchedUser = USERS.find(
    (user) =>
      user.email.toLowerCase() === enteredEmail.toLowerCase() &&
      user.password === enteredPassword
  );

  if (matchedUser) {
    // Save username for next session
    localStorage.setItem('savedUsername', enteredEmail);
    // Redirect to correct home
    window.location.href = matchedUser.redirect;
  } else {
    showErrorMessage('Invalid email or password. Please try again.');
  }
});

// ====== INLINE ERROR MESSAGE ======
function showErrorMessage(message) {
  let errorBox = document.getElementById('errorBox');

  if (!errorBox) {
    errorBox = document.createElement('p');
    errorBox.id = 'errorBox';
    errorBox.className = 'text-red-600 text-sm mt-2 text-center';
    loginForm.appendChild(errorBox);
  }

  errorBox.textContent = message;

  setTimeout(() => {
    errorBox.textContent = '';
  }, 3000);
}

// ====== SWITCH BETWEEN LOGIN & REGISTER ======
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginCard.classList.add('hidden');
  registerCard.classList.remove('hidden');
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerCard.classList.add('hidden');
  loginCard.classList.remove('hidden');
  // Keep username but clear password
  passwordInput.value = '';
});
