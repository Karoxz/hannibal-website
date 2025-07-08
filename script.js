async function fetchEpisodes() {
    try {
      const res = await fetch('https://api.tvmaze.com/shows/194/episodes');
      const episodes = await res.json();

      const container = document.getElementById('episodes-container');

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
      document.getElementById('episodes-container').innerText = 'Failed to load episodes.';
    }
  }

  fetchEpisodes();

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  const burgerBtn = document.getElementById('burger-btn');
  const navMenu = document.getElementById('nav-menu');
  
  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
  });
  
 
  const showPassBtn = document.getElementById('show-password-btn');
  const passwordInput = document.getElementById('password');
  
  showPassBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      showPassBtn.textContent = 'Hide Password';
    } else {
      passwordInput.type = 'password';
      showPassBtn.textContent = 'Show Password';
    }
  });
  
  
  const form = document.getElementById('my-form');
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
  
  
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAcceptBtn = document.getElementById('cookie-accept');
  
  if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
  }
  
  cookieAcceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
  });
  