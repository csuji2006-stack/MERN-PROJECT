function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  localStorage.setItem("username", user);
  localStorage.setItem("password", pass);

  window.location.href = "login.html";
}

function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  if (
    user === localStorage.getItem("username") &&
    pass === localStorage.getItem("password")
  ) {
    window.location.href = "home.html";
  } else {
    alert("Invalid login!");
  }
}

function loadUser() {
  let user = localStorage.getItem("username");
  document.getElementById("welcomeText").innerText =
    "Welcome, " + user + " 👋";
}

function logout() {
  window.location.href = "login.html";
}

// Toggle logo spin in register popup
// Toggle logo spin (id optional)
function toggleLogo(id) {
  const el = id ? document.getElementById(id) : document.getElementById('regLogo');
  if (!el) return;
  el.classList.toggle('spin');
}

// Allow keyboard activation (space/enter) for logos
document.addEventListener('keydown', function (e) {
  if (e.key === ' ' || e.key === 'Spacebar') {
    // prevent page scroll on space
    if (document.activeElement && document.activeElement.classList.contains('logo')) {
      e.preventDefault();
      toggleLogo(document.activeElement.id);
    }
  }
  if (e.key === 'Enter') {
    if (document.activeElement && document.activeElement.classList.contains('logo')) {
      toggleLogo(document.activeElement.id);
    }
  }
});

// Toggle show/hide password for inputs
function toggleShowPassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.innerText = 'Hide';
  } else {
    input.type = 'password';
    if (btn) btn.innerText = 'Show';
  }
}

// Make course cards open YouTube videos on click
document.addEventListener('DOMContentLoaded', function () {
  const defaults = [
    'https://www.youtube.com/watch?v=UB1O30fR-EE', // Web Dev
    'https://www.youtube.com/watch?v=rfscVS0vtbw', // Python
    'https://www.youtube.com/watch?v=9ylj9NR0Lcg'  // Data Analytics
  ];

  const cards = document.querySelectorAll('.course-card');
  cards.forEach((card, i) => {
    const url = card.dataset.video || defaults[i] || 'https://www.youtube.com/';
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // if clicked element is a link or button, ignore
      const tag = e.target.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') return;
      window.open(url, '_blank', 'noopener');
    });
  });
});