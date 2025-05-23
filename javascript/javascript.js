document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    if (window.scrollY !== lastScrollY) {
      if (window.scrollY > 50) {
        navbar.style.padding = "10px 0";
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
      } else {
        navbar.style.padding = "20px 0";
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.05)";
      }
      lastScrollY = window.scrollY;
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 70;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 100) {
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

  const progressBars = document.querySelectorAll(".progress-bar");
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";
          requestAnimationFrame(() => {
            entry.target.style.width = width;
            entry.target.style.transition = "width 1s ease-in-out";
          });
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const inputs = contactForm.querySelectorAll("input, textarea");

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          valid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (valid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        setTimeout(() => {
          contactForm.reset();
          const successMessage = document.createElement("div");
          successMessage.className = "alert alert-success mt-3";
          successMessage.textContent =
            "Your message has been sent successfully!";
          contactForm.appendChild(successMessage);
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;

          setTimeout(() => successMessage.remove(), 5000);
        }, 1500);
      }
    });

    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("is-invalid");
        }
      });
    });
  }

  const cyberGrid = document.querySelector(".cyber-grid");
  if (cyberGrid) {
    let ticking = false;
    window.addEventListener("mousemove", function (e) {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = e.clientX / window.innerWidth;
          const y = e.clientY / window.innerHeight;
          cyberGrid.style.opacity = 0.4 + x * 0.3;
          cyberGrid.style.height = `${60 + y * 40}px`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  const currentLocation = window.location.hash;
  if (currentLocation) {
    document
      .querySelector(`.navbar-nav a[href="${currentLocation}"]`)
      ?.classList.add("active");
  } else {
    document
      .querySelector('.navbar-nav a[href="#home"]')
      ?.classList.add("active");
  }
});
