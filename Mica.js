// Typing effect for skills in Home page only
const skills = [
  "Web-Developer",
  "Logo & Poster Designer",
  "System Administrator",
  "Cybersecurity Enthusiast",
];
let skillIndex = 0;
let charIndex = 0;
let typing = true;
const typedSkill = document.getElementById("typed-skill");
const cursor = document.querySelector(".cursor");

// Slower typing and erasing speeds
const TYPE_SPEED = 220;
const ERASE_SPEED = 120;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_ERASE = 800;

function typeSkill() {
  if (!typedSkill || typedSkill.offsetParent === null) return; // Only run if visible
  if (typing) {
    if (charIndex < skills[skillIndex].length) {
      typedSkill.textContent += skills[skillIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeSkill, TYPE_SPEED);
    } else {
      typing = false;
      setTimeout(typeSkill, PAUSE_AFTER_TYPE);
    }
  } else {
    if (charIndex > 0) {
      typedSkill.textContent = skills[skillIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeSkill, ERASE_SPEED);
    } else {
      typing = true;
      skillIndex = (skillIndex + 1) % skills.length;
      setTimeout(typeSkill, PAUSE_AFTER_ERASE);
    }
  }
}
document.addEventListener("DOMContentLoaded", typeSkill);

// Section navigation: show only one section at a time
const navLinks = document.querySelectorAll(".navbar a, .logo");
const sections = [
  document.querySelector(".home"),
  document.querySelector(".about-section"),
  document.querySelector(".projects-section"),
  document.querySelector(".resume-section"),
  document.querySelector(".cert-section"),
  document.querySelector(".contact-section"),
];

function updateActiveLink(sectionId) {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
  const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

function showSection(sectionId) {
  sections.forEach((section) => {
    if (section && section.id === sectionId) {
      section.style.display = "flex";
    } else if (section) {
      section.style.display = "none";
    }
  });
  updateActiveLink(sectionId);
  // Restart typing effect if on home
  if (sectionId === "home" && typedSkill) {
    typedSkill.textContent = "";
    charIndex = 0;
    skillIndex = 0;
    typing = true;
    typeSkill();
  }
}

// Initial state: show home only and set active link
showSection("home");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.replace("#", "");
      showSection(sectionId);
      window.location.hash = href;
    }
  });
});
