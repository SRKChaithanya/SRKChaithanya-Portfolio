// Global variables
let currentTheme = localStorage.getItem('theme') || 'dark';
let typedTextElement;
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Text array for typing effect
const textArray = [
  'Software Engineer',
  'AI & ML Engineer', 
  'Python Developer',
  'Generative AI Enthusiast'
];

// Initialize application when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize all app functionality
function initializeApp() {
  initializeTheme();
  initializeLoader();
  initializeNavigation();
  initializeTypingEffect();
  initializeParticles();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeModals();
  initializeProjectButtons();
}

// Theme Management
function initializeTheme() {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();
  updateLogo();

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
  updateLogo();

  // Reinitialize particles for theme change
  if (window.pJSDom && window.pJSDom.length > 0) {
    initializeParticles();
  }
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

function updateLogo() {
  const logos = document.querySelectorAll('.nav-logo');
  logos.forEach(logo => {
    logo.src = currentTheme === 'dark' ? '/static/images/logo.png' : '/static/images/logo-light.png';
  });
}

// Loader Management
function initializeLoader() {
  const loader = document.getElementById('loader');
  if (loader) {
    // Hide loader after page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1500);
    });
  }
}

// Navigation Management
function initializeNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // Update active navigation link on scroll
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleNavbarScroll);
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = currentTheme === 'dark' 
        ? 'rgba(10, 10, 10, 0.98)' 
        : 'rgba(248, 249, 250, 0.98)';
    } else {
      navbar.style.background = currentTheme === 'dark' 
        ? 'rgba(10, 10, 10, 0.95)' 
        : 'rgba(248, 249, 250, 0.95)';
    }
  }
}

// Typing Effect
function initializeTypingEffect() {
  typedTextElement = document.getElementById('typed-text');
  if (typedTextElement) {
    typeText();
  }
}

function typeText() {
  const currentText = textArray[currentTextIndex];
  
  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && currentCharIndex === currentText.length) {
    typingSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % textArray.length;
    typingSpeed = 500; // Pause before next text
  }
  
  setTimeout(typeText, typingSpeed);
}

// Particle System
function initializeParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: currentTheme === 'dark' ? 100 : 60,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: currentTheme === 'dark' ? '#00ffff' : '#0099cc'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: currentTheme === 'dark' ? 0.6 : 0.4,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: currentTheme === 'dark' ? '#00ffff' : '#0099cc',
          opacity: currentTheme === 'dark' ? 0.4 : 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Add animation classes to elements
  const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .internship-card, .achievement-category');
  animatedElements.forEach((el, index) => {
    el.classList.add('fade-in');
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
  
  // Add slide animations for specific elements
  const leftElements = document.querySelectorAll('.about-text');
  leftElements.forEach(el => {
    el.classList.add('slide-in-left');
    observer.observe(el);
  });
  
  const rightElements = document.querySelectorAll('.education');
  rightElements.forEach(el => {
    el.classList.add('slide-in-right');
    observer.observe(el);
  });
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Modal Management
function initializeModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.close');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
      closeModal();
    }
  });
}

function openModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (modal && modalBody) {
    const projectData = getProjectData(projectId);
    modalBody.innerHTML = createProjectModalContent(projectData);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function getProjectData(projectId) {
  const projectsData = {
    'hate-speech': {
      title: 'Automated Detection of Hate Speech in Online Platforms',
      description: 'A comprehensive deep learning solution for automatically detecting and mitigating hate speech in online group chat platforms, ensuring a safer and more welcoming environment for all users.',
      technologies: ['BiLSTM', 'GloVe Embeddings', 'Gradio', 'Python', 'TensorFlow'],
      features: [
        'Bidirectional LSTM architecture for context understanding',
        'Pre-trained GloVe embeddings for semantic representation',
        'Interactive web interface using Gradio',
        'Real-time hate speech classification',
        '86% accuracy on test dataset',
        'Scalable architecture for production deployment'
      ],
      challenges: [
        'Handling contextual nuances in language',
        'Balancing precision and recall metrics',
        'Processing multiple languages and dialects',
        'Dealing with evolving hate speech patterns'
      ],
      impact: 'Successfully developed during Infosys Springboard internship as team leader, demonstrating strong project management and technical leadership skills.'
    },
    'rag-chatbot': {
      title: 'Multi User Chatbot with Conversational RAG',
      description: 'An intelligent Retrieval-Augmented Generation (RAG) chatbot built with Python, designed to provide accurate and context-aware responses by leveraging external knowledge sources.',
      technologies: ['RAG', 'Python', 'FastAPI', 'Streamlit', 'Chroma Vector Store', 'LangChain'],
      features: [
        'Retrieval-Augmented Generation for accurate responses',
        'Chroma Vector Store for efficient similarity search',
        'History-aware context retrieval for follow-up questions',
        'Multi-user session management',
        'RESTful API endpoints using FastAPI',
        'Interactive web interface with Streamlit',
        'Context clustering of dense vectors'
      ],
      challenges: [
        'Implementing efficient vector similarity search',
        'Managing conversation context across sessions',
        'Optimizing retrieval performance at scale',
        'Ensuring response relevance and accuracy'
      ],
      impact: 'Demonstrates advanced understanding of modern AI architectures and ability to integrate multiple technologies for comprehensive solutions.'
    }
  };
  
  return projectsData[projectId] || {};
}

function createProjectModalContent(project) {
  return `
    <h2>${project.title}</h2>
    <p class="project-description">${project.description}</p>
    
    <h3><i class="fas fa-tools"></i> Technologies Used</h3>
    <div class="modal-tags">
      ${project.technologies?.map(tech => `<span class="tag">${tech}</span>`).join('') || ''}
    </div>
    
    <h3><i class="fas fa-star"></i> Key Features</h3>
    <ul class="feature-list">
      ${project.features?.map(feature => `<li>${feature}</li>`).join('') || ''}
    </ul>
    
    <h3><i class="fas fa-exclamation-triangle"></i> Technical Challenges</h3>
    <ul class="challenge-list">
      ${project.challenges?.map(challenge => `<li>${challenge}</li>`).join('') || ''}
    </ul>
    
    <h3><i class="fas fa-trophy"></i> Impact & Achievements</h3>
    <p class="impact-text">${project.impact}</p>
    
    <style>
      .project-description {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-lg);
        line-height: 1.6;
      }
      
      .modal-tags {
        display: flex;
        gap: var(--spacing-sm);
        flex-wrap: wrap;
        margin-bottom: var(--spacing-lg);
      }
      
      .feature-list,
      .challenge-list {
        margin-bottom: var(--spacing-lg);
        padding-left: var(--spacing-md);
      }
      
      .feature-list li,
      .challenge-list li {
        color: var(--text-secondary);
        margin-bottom: var(--spacing-sm);
        line-height: 1.5;
      }
      
      .impact-text {
        color: var(--text-secondary);
        line-height: 1.6;
        font-style: italic;
      }
      
      #modal-body h3 {
        color: var(--primary-color);
        margin: var(--spacing-lg) 0 var(--spacing-md) 0;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
      }
      
      #modal-body h2 {
        color: var(--text-primary);
        margin-bottom: var(--spacing-md);
        font-size: var(--font-size-xl);
      }
    </style>
  `;
}

// Project Buttons
function initializeProjectButtons() {
  const projectButtons = document.querySelectorAll('.project-view-btn');
  projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = button.getAttribute('data-project');
      if (projectId) {
        openModal(projectId);
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimizations
window.addEventListener('scroll', debounce(() => {
  updateActiveNavLink();
  handleNavbarScroll();
}, 10));

// Resize handler for particles
window.addEventListener('resize', debounce(() => {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.canvasSize();
  }
}, 100));

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// Console welcome message
console.log(`
  ╔═══════════════════════════════════════╗
  ║     Welcome to SRK Portfolio Site     ║
  ║      Rama Krishna Chaithanya S        ║
  ║         AI & ML Engineer              ║
  ╚═══════════════════════════════════════╝
`);
