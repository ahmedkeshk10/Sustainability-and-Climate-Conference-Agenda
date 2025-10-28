/**
 * Switch between Arabic and English languages
 * @param {string} lang - Language code ('ar' or 'en')
 */
function switchLanguage(lang) {
  // Update HTML attributes for RTL/LTR support
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Update active button state
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Show/hide content based on language
  document.querySelectorAll("[data-lang-content]").forEach((element) => {
    if (element.getAttribute("data-lang-content") === lang) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });

  // Re-trigger scroll animations for the new language content
  setTimeout(() => {
    const visibleTimeline = document.querySelector(
      `.timeline[data-lang-content="${lang}"]:not(.hidden)`
    );
    if (visibleTimeline) {
      observeTimelineItems();
    }
  }, 100);
}

// ===================================
// SCROLL ANIMATION FUNCTIONALITY
// Uses Intersection Observer API
// ===================================

/**
 * Initialize Intersection Observer for timeline items
 */
function observeTimelineItems() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Trigger when 20% of element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for smoother cascade effect
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);

        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all timeline items in the currently visible language
  const currentLang = document.documentElement.getAttribute("lang");
  const visibleTimeline = document.querySelector(
    `.timeline[data-lang-content="${currentLang}"]:not(.hidden)`
  );

  if (visibleTimeline) {
    const timelineItems = visibleTimeline.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      observer.observe(item);
    });
  }
}

// ===================================
// SMOOTH SCROLL BEHAVIOR
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
window.addEventListener("DOMContentLoaded", () => {
  // Set default language to Arabic
  switchLanguage("ar");

  // Initialize scroll animations
  observeTimelineItems();

  // Add entrance animation to header
  const header = document.querySelector(".header");
  header.style.opacity = "0";
  setTimeout(() => {
    header.style.transition = "opacity 1s ease";
    header.style.opacity = "1";
  }, 100);
});

// ===================================
// CUSTOMIZATION HELPER FUNCTIONS
// Use these to easily update content programmatically
// ===================================

/**
 * Update conference details
 * @param {Object} details - Object containing patronage, date, and location
 */
function updateConferenceDetails(details) {
  if (details.patronage_ar) {
    document.querySelector(
      '.conference-details[data-lang-content="ar"] .detail-item:nth-child(1) .detail-value'
    ).textContent = details.patronage_ar;
  }
  if (details.patronage_en) {
    document.querySelector(
      '.conference-details[data-lang-content="en"] .detail-item:nth-child(1) .detail-value'
    ).textContent = details.patronage_en;
  }
  if (details.date_ar) {
    document.querySelector(
      '.conference-details[data-lang-content="ar"] .detail-item:nth-child(2) .detail-value'
    ).textContent = details.date_ar;
  }
  if (details.date_en) {
    document.querySelector(
      '.conference-details[data-lang-content="en"] .detail-item:nth-child(2) .detail-value'
    ).textContent = details.date_en;
  }
  if (details.location_ar) {
    document.querySelector(
      '.conference-details[data-lang-content="ar"] .detail-item:nth-child(3) .detail-value'
    ).textContent = details.location_ar;
  }
  if (details.location_en) {
    document.querySelector(
      '.conference-details[data-lang-content="en"] .detail-item:nth-child(3) .detail-value'
    ).textContent = details.location_en;
  }
}

// Example usage (uncomment and modify as needed):
// updateConferenceDetails({
//     patronage_ar: 'وزارة المالية',
//     patronage_en: 'Ministry of Finance',
//     date_ar: '15 نوفمبر 2025',
//     date_en: 'November 15, 2025',
//     location_ar: 'القاهرة، مصر',
//     location_en: 'Cairo, Egypt'
// });
