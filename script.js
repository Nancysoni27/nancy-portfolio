/* =========================================================
   NANCY SONI — PORTFOLIO SCRIPT
   1. Mobile navigation toggle
   2. Close mobile menu on link click
   3. Active nav-link on scroll (IntersectionObserver)
   4. Scroll reveal animation for sections
   5. Progress bar fill animation (Currently Learning)
   6. Back-to-top button
   7. Auto-update footer year
   8. Navbar shadow/blur on scroll
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. MOBILE NAV TOGGLE ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* ---------- 2. CLOSE MOBILE MENU ON LINK CLICK ---------- */
  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 3. ACTIVE NAV-LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- 4. SCROLL REVEAL ANIMATION ---------- */
  // Tag elements that should reveal on scroll
  const revealTargets = document.querySelectorAll(
    ".about__copy, .about__facts, .skill-card, .learning-card, .timeline__item, .contact-card"
  );
  revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Trigger progress bar fill once its card becomes visible
          const bar = entry.target.querySelector(".progress-fill");
          if (bar) {
            bar.style.width = `${bar.dataset.progress}%`;
          }

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- 5. BACK-TO-TOP BUTTON ---------- */
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 6. FOOTER YEAR ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 8. RESUME BUTTON PLACEHOLDER ----------
     No resume file has been added yet. This prevents the link
     from jumping to the top of the page (its href is "#") and
     tells you what to do once you have a resume PDF ready.
     TO ACTIVATE: replace href="#" in index.html with your resume
     file path, e.g. href="Nancy_Soni_Resume.pdf", and remove
     this click handler + the id="resumeBtn" check below. */
  const resumeBtn = document.getElementById("resumeBtn");
  resumeBtn.addEventListener("click", (e) => {
    if (resumeBtn.getAttribute("href") === "#") {
      e.preventDefault();
      alert("Add your resume PDF to this folder and update the Download Resume link in index.html.");
    }
  });

  /* ---------- 7. NAVBAR STYLE ON SCROLL ---------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 10
      ? "0 8px 24px -12px rgba(0,0,0,0.5)"
      : "none";
  });

});
