"use strict";

// Selectors

// Buttons
const homeBtn = document.querySelector(".home");
const aboutBtn = document.querySelector(".about");
const workBtn = document.querySelector(".work");
const contactBtn = document.querySelector(".contact");
const contactUsBtn = document.querySelector(".btn--blue");
const navList = document.querySelector(".navigation__list");
const navLinks = document.querySelector(".navigation__link");
const nav = document.querySelector(".navigation");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const imgTargets = document.querySelector("img[data-src]");

// Scroll to pages
const homePage = document.getElementById("home");
const aboutPage = document.getElementById("about");
const servicesPage = document.getElementById("services");
const footerPage = document.getElementById("footer");

// Testing buttons
// contactUsBtn.addEventListener("click", function () {
//   console.log("clikced");
// });

// 1. Implementing smooth scrolling
contactUsBtn.addEventListener("click", function (e) {
  footerPage.scrollIntoView({ behavior: "smooth" });
});

navList.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("navigation__link")) {
    const id = e.target.getAttribute("href"); //Selecting the text inside href
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" }); //The id is read with # ex: #home, so we are passing #home, when homebtn is clicked
  }
});

// 2. Sticky navigation

// const coords = aboutPage.getBoundingClientRect();
// // console.log(coords);
// window.addEventListener("scroll", function (e) {
//   // console.log(window.scrollY);

//   if (window.scrollY > coords.top) nav.classList.add("fixed");
//   else nav.classList.remove("fixed");
// });

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entries);
  if (!entry.isIntersecting) nav.classList.add("fixed");
  else nav.classList.remove("fixed");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: "-100px", //Making the header stop at 90%
});

headerObserver.observe(header);

// Reveal sections
const revealSections = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return; //Guard clause: If the entry is not intersecting, then don't execute the below code
  entry.target.classList.remove("section--hidden"); //don forget the target(which is an attribute of 'IntersectionObserverEntry'), actually we use target element to make the section which just intersected to be visible not all section!!!
  observer.unobserve(entry.target); //For better performance
};

const sectionOberver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionOberver.observe(section);
  section.classList.add("section--hidden");
});

// Lazy loading
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img");
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgObserver.observe(imgTargets);
