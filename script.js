// ===== GLOBAL VARIABLES =====
let currentModal = null;
let reviewsLoaded = 3;
let countdownDate = new Date("Sep 15, 2024 00:00:00").getTime();

// ===== DOM CONTENT LOADED =====
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Initialize all components
  initializeNavigation();
  initializeScrollProgress();
  initializeBackToTop();
  initializeAccordions();
  initializeFAQ();
  initializeCountdown();
  initializeFormHandlers();
  initializeReviews();
  initializeSmoothScrolling();

  // Add scroll event listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });
  }

  // Close mobile menu when clicking on a link
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Update active nav link on scroll
  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ===== SCROLL PROGRESS =====
function initializeScrollProgress() {
  const progressBar = document.getElementById("progressIndicator");

  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      progressBar.style.width = scrollPercent + "%";
    });
  }
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ===== SCROLL HANDLING =====
function handleScroll() {
  const navbar = document.querySelector(".navbar");

  // Add scrolled class to navbar
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function handleResize() {
  // Handle responsive changes
  const navLinks = document.querySelector(".nav-links");
  const navToggle = document.querySelector(".nav-toggle");

  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

function scrollToSection(sectionId) {
  const targetSection = document.querySelector(sectionId);

  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// ===== ACCORDIONS =====
function initializeAccordions() {
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const accordionItem = button.closest(".accordion-item");
      const isActive = accordionItem.classList.contains("active");

      // Close all accordion items
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
        const btn = item.querySelector(".accordion-button");
        btn.setAttribute("aria-expanded", "false");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        accordionItem.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ===== FAQ =====
function initializeFAQ() {
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active");
      }
    });
  });
}

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
  const countdownTimer = document.getElementById("countdownTimer");

  if (countdownTimer) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (daysEl) daysEl.textContent = days.toString().padStart(2, "0");
  if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");
  if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, "0");
  if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, "0");

  if (distance < 0) {
    document.getElementById("countdownTimer").innerHTML =
      "<p>Навчання розпочалось!</p>";
  }
}

// ===== MODAL HANDLING =====
function openModal(tariff) {
  const modal = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const selectedTariffInput = document.getElementById("selectedTariff");

  if (modal && modalTitle && selectedTariffInput) {
    const tariffNames = {
      start: "Start - $50",
      build: "Build - $490",
      pro: "Pro - $790",
      business: "Business - $1990",
    };

    modalTitle.textContent = `Обрати тариф: ${tariffNames[tariff] || tariff}`;
    selectedTariffInput.value = tariff;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    currentModal = modal;

    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector("input");
      if (firstInput) firstInput.focus();
    }, 300);
  }
}

function closeModal() {
  const modal = document.getElementById("modalOverlay");

  if (modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    currentModal = null;

    // Reset form
    const form = document.getElementById("tariffForm");
    if (form) form.reset();
    clearFormErrors();
  }
}

// Close modal on outside click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    closeModal();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentModal) {
    closeModal();
  }
});

// ===== FORM HANDLING =====
function initializeFormHandlers() {
  const tariffForm = document.getElementById("tariffForm");

  if (tariffForm) {
    tariffForm.addEventListener("submit", handleTariffSubmit);

    // Add real-time validation
    const inputs = tariffForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearFieldError(input));
    });
  }
}

async function handleTariffSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');

  // Validate form
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  try {
    // Prepare data for Telegram
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      experience: formData.get("experience"),
      motivation: formData.get("motivation"),
      selectedTariff: formData.get("selectedTariff"),
      timestamp: new Date().toISOString(),
    };

    // Send to Telegram Bot
    await sendToTelegram(data);

    // Show success message
    showNotification(
      "Заявку успішно надіслано! Ми зв'яжемося з вами найближчим часом.",
      "success"
    );

    // Close modal
    closeModal();
  } catch (error) {
    console.error("Error submitting form:", error);
    showNotification(
      "Помилка при надсиланні заявки. Спробуйте ще раз.",
      "error"
    );
  } finally {
    // Remove loading state
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }
}

async function sendToTelegram(data) {
  // Replace with your actual Telegram Bot Token and Chat ID
  const BOT_TOKEN = "YOUR_BOT_TOKEN";
  const CHAT_ID = "YOUR_CHAT_ID";

  const message = `
🎓 Нова заявка на WIZA!

👤 Ім'я: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📱 Телефон: ${data.phone}
🌍 Країна: ${data.country}
💼 Досвід: ${data.experience}
💰 Тариф: ${data.selectedTariff}

💭 Мотивація: ${data.motivation}

🕐 Час: ${new Date(data.timestamp).toLocaleString("uk-UA")}
    `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message to Telegram");
  }

  return response.json();
}

// ===== FORM VALIDATION =====
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldType = field.type;
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = "";

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    isValid = false;
    errorMessage = "Це поле обов'язкове для заповнення";
  }

  // Specific validation based on field type
  if (value && fieldType === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = "Введіть коректну email адресу";
    }
  }

  if (value && fieldType === "tel") {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMessage = "Введіть коректний номер телефону";
    }
  }

  if ((value && fieldName === "firstName") || fieldName === "lastName") {
    if (value.length < 2) {
      isValid = false;
      errorMessage = "Мінімум 2 символи";
    }
  }

  // Show/hide error
  if (isValid) {
    clearFieldError(field);
  } else {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

function showFieldError(field, message) {
  const formGroup = field.closest(".form-group");

  // Remove existing error
  clearFieldError(field);

  // Add error class
  formGroup.classList.add("error");

  // Create error message element
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;

  // Insert error message
  formGroup.appendChild(errorElement);
}

function clearFieldError(field) {
  const formGroup = field.closest(".form-group");
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  if (errorMessage) {
    errorMessage.remove();
  }
}

function clearFormErrors() {
  const errorMessages = document.querySelectorAll(".error-message");
  const errorGroups = document.querySelectorAll(".form-group.error");

  errorMessages.forEach((msg) => msg.remove());
  errorGroups.forEach((group) => group.classList.remove("error"));
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: "#28a745",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
  };
  return colors[type] || colors.info;
}

// Add notification animations to CSS
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
    }
`;

// Inject notification styles
const styleSheet = document.createElement("style");
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// ===== REVIEWS HANDLING =====
function initializeReviews() {
  const loadMoreBtn = document.getElementById("loadMoreReviews");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", loadMoreReviews);
  }
}

const additionalReviews = [
  {
    name: "Анна",
    location: "Канада",
    text: "Завдяки WIZA змогла швидко освоїти нову професію після переїзду. Тепер маю стабільний дохід і допомагаю іншим здійснювати їхні мрії про подорожі.",
    avatar: "images/review-4.jpg",
    stars: 5,
  },
  {
    name: "Дмитро",
    location: "Україна",
    text: "Програма дуже структурована і зрозуміла. Навіть без досвіду в візовій сфері зміг швидко розібратися і почати працювати з клієнтами.",
    avatar: "images/review-5.jpg",
    stars: 5,
  },
  {
    name: "Катерина",
    location: "Німеччина",
    text: "Найкраща інвестиція в моє майбутнє! Тепер працюю віддалено і заробляю більше, ніж на попередній роботі в офісі.",
    avatar: "images/review-6.jpg",
    stars: 5,
  },
  {
    name: "Олександр",
    location: "США",
    text: "Марта - справжній професіонал! Її підхід до навчання і підтримка учнів на найвищому рівні. Рекомендую всім!",
    avatar: "images/review-7.jpg",
    stars: 5,
  },
  {
    name: "Юлія",
    location: "Польща",
    text: "Дуже задоволена результатом навчання. За 3 місяці змогла вийти на дохід $1500/місяць. Дякую команді WIZA!",
    avatar: "images/review-8.jpg",
    stars: 5,
  },
  {
    name: "Віктор",
    location: "Чехія",
    text: "Програма дала мені не просто знання, а цілу систему роботи. Тепер веду власне візове агентство і планую розширюватися.",
    avatar: "images/review-9.jpg",
    stars: 5,
  },
];

function loadMoreReviews() {
  const reviewsContainer = document.getElementById("reviewsContainer");
  const loadMoreBtn = document.getElementById("loadMoreReviews");

  if (!reviewsContainer || !loadMoreBtn) return;

  // Show loading state
  loadMoreBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Завантаження...';
  loadMoreBtn.disabled = true;

  // Simulate loading delay
  setTimeout(() => {
    const reviewsToShow = additionalReviews.slice(
      reviewsLoaded - 3,
      reviewsLoaded
    );

    reviewsToShow.forEach((review, index) => {
      const reviewElement = createReviewElement(review, reviewsLoaded + index);
      reviewsContainer.appendChild(reviewElement);
    });

    reviewsLoaded += 3;

    // Hide button if no more reviews
    if (reviewsLoaded >= additionalReviews.length + 3) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.innerHTML =
        '<i class="fas fa-plus"></i> Завантажити більше відгуків';
      loadMoreBtn.disabled = false;
    }

    // Re-initialize AOS for new elements
    AOS.refresh();
  }, 1000);
}

function createReviewElement(review, index) {
  const reviewDiv = document.createElement("div");
  reviewDiv.className = "review-card";
  reviewDiv.setAttribute("data-aos", "fade-up");
  reviewDiv.setAttribute("data-aos-delay", (index % 3) * 100);

  const stars = Array(review.stars)
    .fill('<i class="fas fa-star"></i>')
    .join("");

  reviewDiv.innerHTML = `
        <div class="review-content">
            <div class="review-stars">
                ${stars}
            </div>
            <p class="review-text">
                "${review.text}"
            </p>
        </div>
        <div class="review-author">
            <img src="${review.avatar}" alt="${review.name}" class="author-avatar">
            <div class="author-info">
                <div class="author-name">${review.name}</div>
                <div class="author-location">${review.location}</div>
            </div>
        </div>
    `;

  return reviewDiv;
}

// ===== VIDEO HANDLING =====
function playVideo() {
  const videoContainer = document.getElementById("videoContainer");
  const videoPlayer = document.getElementById("videoPlayer");

  if (videoContainer && videoPlayer) {
    // Replace with actual video embed code
    videoPlayer.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

    videoContainer.style.display = "block";
    document.body.style.overflow = "hidden";
  }
}

function closeVideo() {
  const videoContainer = document.getElementById("videoContainer");
  const videoPlayer = document.getElementById("videoPlayer");

  if (videoContainer && videoPlayer) {
    videoContainer.style.display = "none";
    videoPlayer.innerHTML = "";
    document.body.style.overflow = "";
  }
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(eventName, properties = {}) {
  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", eventName, properties);
  }

  // Facebook Pixel
  if (typeof fbq !== "undefined") {
    fbq("track", eventName, properties);
  }

  // Custom analytics
  console.log("Event tracked:", eventName, properties);
}

// Track important user actions
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-track]");
  if (target) {
    const eventName = target.getAttribute("data-track");
    const properties = {
      element: target.tagName.toLowerCase(),
      text: target.textContent.trim(),
      href: target.href || null,
    };

    trackEvent(eventName, properties);
  }
});

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeImages() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img) => {
      img.src = img.dataset.src;
    });
  }
}

// ===== ERROR HANDLING =====
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error);

  // Send error to analytics
  trackEvent("javascript_error", {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
  });
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);

  // Send error to analytics
  trackEvent("promise_rejection", {
    reason: e.reason.toString(),
  });
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function improveAccessibility() {
  // Add skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Перейти до основного контенту";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `;

  // Show skip link on focus
  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.id = "main-content";
    heroSection.setAttribute("role", "main");
  }

  // Improve button accessibility
  const buttons = document.querySelectorAll("button:not([aria-label])");
  buttons.forEach((button) => {
    if (!button.getAttribute("aria-label") && !button.textContent.trim()) {
      button.setAttribute("aria-label", "Кнопка");
    }
  });

  // Add live region for dynamic content
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "sr-only";
  liveRegion.id = "live-region";
  document.body.appendChild(liveRegion);
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function formatPrice(price, currency = "$") {
  return `${currency}${price.toLocaleString()}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
}

// ===== COOKIE CONSENT =====
function initializeCookieConsent() {
  if (localStorage.getItem("cookieConsent") !== "accepted") {
    showCookieConsent();
  }
}

function showCookieConsent() {
  const cookieConsent = document.createElement("div");
  cookieConsent.className = "cookie-consent";
  cookieConsent.innerHTML = `
        <div class="cookie-content">
            <p>Ми використовуємо файли cookie для покращення роботи сайту та аналітики. Продовжуючи користуватися сайтом, ви погоджуєтеся з їх використанням.</p>
            <div class="cookie-actions">
                <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Прийняти</button>
                <button class="btn btn-outline btn-sm" onclick="declineCookies()">Відхилити</button>
            </div>
        </div>
    `;

  cookieConsent.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--white);
        border-top: 1px solid var(--light-gray);
        padding: 1rem;
        z-index: 10000;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    `;

  document.body.appendChild(cookieConsent);
}

function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  document.querySelector(".cookie-consent").remove();

  // Initialize analytics
  initializeAnalytics();
}

function declineCookies() {
  localStorage.setItem("cookieConsent", "declined");
  document.querySelector(".cookie-consent").remove();
}

function initializeAnalytics() {
  // Initialize Google Analytics
  if (typeof gtag !== "undefined") {
    gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }

  // Initialize Facebook Pixel
  if (typeof fbq !== "undefined") {
    fbq("consent", "grant");
  }
}

// ===== INITIALIZATION =====
// Initialize cookie consent
document.addEventListener("DOMContentLoaded", () => {
  initializeCookieConsent();
  improveAccessibility();
  optimizeImages();
});

// Optimize scroll handlers with throttling
window.addEventListener("scroll", throttle(handleScroll, 16));
window.addEventListener("resize", debounce(handleResize, 250));

// ===== EXPORT FOR GLOBAL ACCESS =====
window.WIZA = {
  openModal,
  closeModal,
  scrollToSection,
  scrollToTop,
  playVideo,
  closeVideo,
  trackEvent,
  showNotification,
};
