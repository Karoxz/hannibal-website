document.addEventListener("DOMContentLoaded", () => {
  const cookieBox = document.getElementById("cookie-notification");
  const acceptBtn = document.getElementById("accept-cookies");

  if (cookieBox && localStorage.getItem("cookiesAccepted") === "true") {
    cookieBox.classList.add("hidden");
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBox.classList.add("hidden");
    });
  }
  async function fetchEpisodes() {
    try {
      const res = await fetch('https://api.tvmaze.com/shows/194/episodes');
      const episodes = await res.json();

      const container = document.getElementById('episodes-container');
      if (!container) return;

      episodes.forEach(ep => {
        const card = document.createElement('div');
        card.className = 'episode-card';

        card.innerHTML = `
          <h3>S${ep.season}E${ep.number}: ${ep.name}</h3>
          <p>${ep.summary ? ep.summary.replace(/<[^>]+>/g, '') : 'No description.'}</p>
          <p><strong>Rating:</strong> ${ep.rating.average ?? 'N/A'}</p>
          ${ep.externals?.imdb ? `<a href="https://www.imdb.com/title/${ep.externals.imdb}" target="_blank">View on IMDB</a>` : ''}
        `;
        container.appendChild(card);
      });
    } catch (err) {
      console.error('Fetch error:', err);
      const container = document.getElementById('episodes-container');
      if (container) container.innerText = 'Failed to load episodes.';
    }
  }
  fetchEpisodes();

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const showPassBtn = document.getElementById('show-password-btn');
  const passwordInput = document.getElementById('password');
  if (showPassBtn && passwordInput) {
    showPassBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPassBtn.textContent = 'Hide Password';
      } else {
        passwordInput.type = 'password';
        showPassBtn.textContent = 'Show Password';
      }
    });
  }

  const form = document.getElementById('my-form');
  if (form) {
    const inputs = form.querySelectorAll('input[required]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      const email = form.querySelector('input[type="email"]');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email.value)) {
        valid = false;
        email.classList.add('error');
      } else if (email) {
        email.classList.remove('error');
      }

      if (valid) {
        alert('Form submitted successfully!');
        form.reset();
      } else {
        alert('Please fill all fields correctly.');
      }
    });
  }
});
