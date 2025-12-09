
document.addEventListener('DOMContentLoaded', function () {
  // Initialize lucide icons
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // Smooth scroll for internal nav links
  const internalLinks = document.querySelectorAll('.nav-link[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const yOffset = -70;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // Signup / Kayıt Ol button -> login.html
  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', function () {
      window.location.href = 'login.html';
    });
  }

  // Sepet işlemleri
  let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartUI() {
    const cartCountElements = document.querySelectorAll('.sepet span');
    cartCountElements.forEach(el => el.textContent = cart.length);
  }
  updateCartUI();

  // Sipariş Et butonları
  const orderBtns = document.querySelectorAll('.order-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card') || document.querySelector('.hero-text');

      // Ürün bilgileri
      const name = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Coffee Ghaida';
      const price = card.querySelector('p') ? parseFloat(card.querySelector('p').textContent.replace('₺','')) : 12.99;
      const image = card.querySelector('img') ? card.querySelector('img').getAttribute('src') : 'img/coffee.jpg';

      // Sepete ekle
      cart.push({name, price, image});
      localStorage.setItem('cartItems', JSON.stringify(cart));
      updateCartUI();

      alert(`${name} sepete eklendi!`);
    });
  });

  // Sepet ikonu tıklaması
  const sepetLink = document.getElementById('sepetLink');
  if (sepetLink) {
    sepetLink.addEventListener('click', function () {
      // navigation occurs via href to cart.html
    });
  }

  // Typing effect
  (function typingEffect() {
    const element = document.getElementById('typed-text');
    const phrases = [
      'Organik Coffee Ghaida',
      'Yeni Nesil Deneyim',
      'Özel Kakao Aromalı Karışım'
    ];
    const typingSpeed = 80;
    const erasingSpeed = 40;
    const delayBetween = 1400;
    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
      if (!element) return;
      const current = phrases[phraseIndex];
      if (typing) {
        if (charIndex < current.length) {
          element.textContent = current.substring(0, charIndex + 1);
          charIndex++;
          setTimeout(type, typingSpeed);
        } else {
          typing = false;
          setTimeout(type, delayBetween);
        }
      } else {
        if (charIndex > 0) {
          element.textContent = current.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(type, erasingSpeed);
        } else {
          typing = true;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 300);
        }
      }
    }
    type();
  })();

  // Footer yılı
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Active nav highlight
  const sections = document.querySelectorAll('section[id]');
  function onScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    sections.forEach(sec => {
      const top = sec.offsetTop - 90;
      const bottom = top + sec.offsetHeight;
      const id = sec.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (scrollPos >= top && scrollPos < bottom) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
});

// Coffee cards filtre ve ipuçları (eski kod bozulmadı)
document.addEventListener('DOMContentLoaded', function() {
  const coffeeCards = document.querySelectorAll('.coffee-card');
  const filterButtons = document.querySelectorAll('.filter-menu button');
  const tips = [
    "Espresso için suyun sıcaklığı 92–94°C olmalıdır.",
    "Cold brew için ideal demleme süresi 18 saattir.",
    "Sütü buharlatırken hafif açı bırakmak mükemmel köpük sağlar.",
    "Taze çekilmiş kahve aromayı önemli ölçüde artırır."
  ];

  function revealCoffeeCards() {
    const triggerBottom = window.innerHeight * 0.85;
    coffeeCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if(cardTop < triggerBottom) card.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealCoffeeCards);
  revealCoffeeCards();

  // Filtreleme
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      coffeeCards.forEach(card => {
        if(filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Yeni ipucu
  const newTipBtn = document.querySelector('.new-tip');
  const tipText = document.querySelector('.tip-text');
  newTipBtn.addEventListener('click', () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    tipText.textContent = randomTip;
  });
});