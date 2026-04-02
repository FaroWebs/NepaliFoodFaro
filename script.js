const navbar = document.getElementById("navbar");
const progressBar = document.querySelector(".progress-bar");
const heroMedia = document.querySelector(".hero-media");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const revealItems = document.querySelectorAll(".reveal");

const setScrollState = () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle("scrolled", scrollY > 40);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;

  if (heroMedia) {
    heroMedia.style.transform = `translateY(${scrollY * 0.2}px) scale(1.05)`;
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("scroll", setScrollState);
window.addEventListener("load", () => {
  document.body.classList.remove("loading");
  setScrollState();
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = event.target.getBoundingClientRect();
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    event.target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});
