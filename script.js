// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navUl = document.querySelector("nav ul");

  if (mobileMenu && navUl) {
    mobileMenu.addEventListener("click", function () {
      navUl.classList.toggle("show");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navUl) {
          navUl.classList.remove("show");
        }
      }
    });
  });

  // Headerin värien muutos scrollatessa
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 100) {
        header.style.backgroundColor = "rgba(15, 15, 26, 0.95)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.backgroundColor = "var(--darker-bg)";
        header.style.backdropFilter = "none";
      }
    }
  });

  // Palvelukorttien animaatio scrollatessa (KORJATTU VERSIO)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Havainnoi palvelukortteja (KORJATTU VERSIO)
  document.querySelectorAll(".service-card").forEach((card) => {
    card.classList.add("fade-in");
    observer.observe(card);
  });

  // Havainnoi about-osio
  const aboutContent = document.querySelector(".about-content");
  if (aboutContent) {
    aboutContent.classList.add("fade-in");

    const aboutObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    aboutObserver.observe(aboutContent);
  }

  // Havainnoi contact-osio
  const contactContent = document.querySelector(".contact-content");
  if (contactContent) {
    contactContent.classList.add("fade-in");

    const contactObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    contactObserver.observe(contactContent);
  }

  // Loput koodista pysyy samana...
  // Aktiivisen navigaatiolinkin korostus
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function highlightNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Klikkausten käsittely mobiililaitteilla
  document.addEventListener("click", function (e) {
    // Sulje mobiilivalikko jos klikataan sen ulkopuolelle
    if (
      navUl &&
      navUl.classList.contains("show") &&
      !e.target.closest("nav") &&
      !e.target.classList.contains("mobile-menu")
    ) {
      navUl.classList.remove("show");
    }
  });

  // Näppäimistön navigointi
  document.addEventListener("keydown", function (e) {
    // ESC sulkee mobiilivalikon
    if (e.key === "Escape" && navUl && navUl.classList.contains("show")) {
      navUl.classList.remove("show");
    }
  });
});

// Responsiivisuuden tarkkailu
window.addEventListener("resize", function () {
  const navUl = document.querySelector("nav ul");
  if (window.innerWidth > 768 && navUl) {
    navUl.classList.remove("show");
  }
});
