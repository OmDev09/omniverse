// Intro Animation Sequence
document.addEventListener("DOMContentLoaded", () => {
  const introText = document.querySelector('.intro-text');
  const introOverlay = document.getElementById('intro-overlay');

  // Wait 1s, then trigger text break effect
  setTimeout(() => {
    introText.classList.add('break');

    // Wait for text break animation to complete, then hide overlay and pop hero
    setTimeout(() => {
      introOverlay.style.opacity = '0';
      introOverlay.style.visibility = 'hidden';

      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-done');

      // Remove overlay completely from DOM after fade out
      setTimeout(() => {
        introOverlay.remove();
      }, 800);
    }, 1200);
  }, 1000);
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileIcon = document.querySelector('.mobile-menu-btn i');

mobileBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  if (navLinks.classList.contains('active')) {
    mobileIcon.classList.remove('fa-bars');
    mobileIcon.classList.add('fa-times');
  } else {
    mobileIcon.classList.remove('fa-times');
    mobileIcon.classList.add('fa-bars');
  }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileIcon.classList.remove('fa-times');
    mobileIcon.classList.add('fa-bars');
  });
});

// Animated Counters for Statistics
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.innerText = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.innerText = target;
      }
    };

    updateCounter();
  });
}

// Intersection Observer for Statistics
const statsSection = document.querySelector('.statistics');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      animateStats();
      hasAnimated = true;
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  observer.observe(statsSection);
}

// Portfolio filtering removed as per design changes

// Network Canvas Animation
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', initCanvas);
initCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 70; i++) {
  particles.push(new Particle());
}

function animateNetwork() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 - distance / 150 * 0.2})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateNetwork);
}

animateNetwork();

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Only initialize scroll animations after the intro animation completes
setTimeout(() => {
  // 1. Animate Section Headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: "top 85%", // Trigger when top of header is 85% down viewport
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });

  // 2. Staggered reveal for Service Cards
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '.services-grid',
      start: "top 80%",
    },
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // 3. Staggered reveal for Portfolio Cards
  gsap.from('.portfolio-card', {
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: "top 80%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // 4. Staggered reveal for Process Steps
  gsap.from('.step-card', {
    scrollTrigger: {
      trigger: '.process-steps',
      start: "top 80%",
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // 5. Staggered reveal for Bento Box Features
  gsap.from('.features-bento .feature-card', {
    scrollTrigger: {
      trigger: '.features-bento',
      start: "top 80%",
    },
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });

  // 6. Testimonial Cards
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonial-slider',
      start: "top 80%",
    },
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // 7. Contact Section split reveal
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '.contact-wrapper',
      start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from('.contact-form-container', {
    scrollTrigger: {
      trigger: '.contact-wrapper',
      start: "top 80%",
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

}, 1500);

// Hero Visual Storytelling Controller
const stepIndicators = document.querySelectorAll('.step-indicator-item');
const stepContents = document.querySelectorAll('.dashboard-step-content');
let activeStep = 1;
const totalSteps = 4;

function showStep(stepNum) {
  stepIndicators.forEach(ind => {
    if (parseInt(ind.getAttribute('data-step')) === stepNum) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });

  stepContents.forEach((content, index) => {
    if (index + 1 === stepNum) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Auto Cycle Steps
setInterval(() => {
  activeStep = (activeStep % totalSteps) + 1;
  showStep(activeStep);
}, 4000);

// Allow manual clicks too
stepIndicators.forEach(ind => {
  ind.addEventListener('click', () => {
    activeStep = parseInt(ind.getAttribute('data-step'));
    showStep(activeStep);
  });
});
