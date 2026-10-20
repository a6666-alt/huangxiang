// ===========================
// 导航栏交互
// ===========================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
});

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // 点击菜单项后关闭移动端菜单
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ===========================
// 轮播 Banner
// ===========================
const carousel = document.querySelector('.carousel');
if (carousel) {
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dots button');
  const prevBtn = document.querySelector('.carousel-arrows .prev');
  const nextBtn = document.querySelector('.carousel-arrows .next');
  let current = 0;
  let timer = null;

  const goTo = (index) => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAuto = () => {
    stopAuto();
    timer = setInterval(next, 5000);
  };
  const stopAuto = () => {
    if (timer) clearInterval(timer);
  };

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // 触摸滑动支持
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      startAuto();
    }
  });

  startAuto();
}

// ===========================
// 滚动出现动画
// ===========================
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

// ===========================
// 数字递增动画
// ===========================
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
if (statNumbers.length) {
  const animateNumber = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));
}

// ===========================
// 联系表单（仅前端演示）
// ===========================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      const original = btn.textContent;
      btn.textContent = '发送中...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '已发送 ✓';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2000);
      }, 800);
    }
  });
}

// ===========================
// 卡片点击跳转
// ===========================
document.querySelectorAll('[data-href]').forEach(el => {
  el.addEventListener('click', () => {
    window.location.href = el.dataset.href;
  });
});
