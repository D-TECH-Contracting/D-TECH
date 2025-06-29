// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reveal on scroll (throttled)
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .card, .addon-card');
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add('visible');
    }
  });
}
// Throttle function
function throttle(fn, wait) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
const throttledReveal = throttle(revealOnScroll, 100);
window.addEventListener('scroll', throttledReveal);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', function() {
    const item = this.parentElement;
    item.classList.toggle('active');
    // Close others
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });
  });
});

// Contact form validation and feedback
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();
    const msgDiv = form.querySelector('.form-message');
    if (!name || !email || !message) {
      msgDiv.textContent = 'Please fill in all fields.';
      msgDiv.style.color = '#e11d48';
      return;
    }
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msgDiv.textContent = 'Please enter a valid email address.';
      msgDiv.style.color = '#e11d48';
      return;
    }
    msgDiv.textContent = 'Thank you! We have received your message.';
    msgDiv.style.color = '#2563eb';
    form.reset();
  });
}

// Back to Top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
backToTop.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Portfolio, Services, Packages, Add-ons modal popup
function showModal(imgSrc, imgAlt, captionText, descText) {
  const modal = document.getElementById('portfolioModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  if (!imgSrc) {
    modalImg.style.display = 'none';
  } else {
    modalImg.style.display = 'block';
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
  }
  modal.classList.add('show');
  modalCaption.innerHTML = `<strong>${captionText}</strong><br><span style='font-weight:400;'>${descText}</span>`;
}

// Portfolio images
const portfolioItems = document.querySelectorAll('.portfolio-item img');
portfolioItems.forEach(img => {
  img.addEventListener('click', function() {
    const caption = this.parentElement.querySelector('p');
    showModal(this.src, this.alt, caption ? caption.textContent : '', '');
  });
});

// Services
const serviceItems = document.querySelectorAll('.service-clickable');
serviceItems.forEach(item => {
  item.addEventListener('click', function() {
    const title = this.childNodes[1].textContent.trim();
    const desc = this.querySelector('.service-desc').textContent;
    showModal('', '', title, desc);
  });
});

// Packages
const packageItems = document.querySelectorAll('.package-clickable');
packageItems.forEach(item => {
  item.addEventListener('click', function() {
    const title = this.querySelector('h3').textContent;
    const desc = this.querySelector('.package-desc').textContent;
    showModal('', '', title, desc);
  });
});

// Add-ons
const addonItems = document.querySelectorAll('.addon-clickable');
addonItems.forEach(item => {
  item.addEventListener('click', function() {
    const title = this.querySelector('h4').textContent;
    const desc = this.querySelector('.addon-desc').textContent;
    showModal('', '', title, desc);
  });
});

// Hardware Advisor section modal popup
const hardwareTitle = document.querySelector('.hardware-clickable');
if (hardwareTitle) {
  hardwareTitle.addEventListener('click', function() {
    const title = hardwareTitle.childNodes[0].textContent.trim();
    const desc = hardwareTitle.querySelector('.hardware-desc').innerHTML;
    showModal('', '', title, desc);
  });
}

// Modal close logic
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
modalClose.addEventListener('click', function() {
  modal.classList.remove('show');
});
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
}); 