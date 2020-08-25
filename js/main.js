/**********Preloading Effect*************/
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".loading-page").style.opacity = "0";
    document.querySelector(".loading-page").style.display = "none";

    document.querySelector(".main-page").style.display = "block";
    setTimeout(() => {
      document.querySelector(".main-page").style.opacity = "1";
    }, 500);
  }, 3000);
});

/**********DOM Functions*************/
(function () {
  const deptBtnList = document.querySelectorAll(".btn-lg");
  const closeBtnList = document.querySelectorAll(".close-btn");
  const navigation = document.querySelector(".nav-top");
  const navItemList = document.querySelectorAll(".nav-link");
  const navItems = document.querySelectorAll(".nav-item");
  const menuNav = document.querySelector(".nav-items");
  const nav = document.querySelector(".nav");
  const carouselProjectsToggler = document.querySelector(
    ".carousel-projects-toggler"
  );
  const menuBtn = document.querySelector(".menu-btn");
  const hamburger = document.querySelector(".menu-btn__burger");

  /******* NAVIGATION ON SCROLL CHANGE ******/
  let showMenu = false;
  let isNavHovered = false;
  menuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (!showMenu) {
      hamburger.classList.add("open");
      nav.classList.add("open");
      menuNav.classList.add("open");
      navItems.forEach((item) => item.classList.add("open"));
      showMenu = true;
    } else {
      hamburger.classList.remove("open");
      nav.classList.remove("open");
      menuNav.classList.remove("open");
      navItems.forEach((item) => item.classList.remove("open"));
      showMenu = false;
    }
  }

  const isHover = (e) => e.parentElement.querySelector(":hover") === e;
  document.addEventListener("mousemove", function checkHover() {
    const hovered = isHover(navigation);
    if (hovered !== checkHover.hovered) {
      isNavHovered = hovered ? true : false;
      checkHover.hovered = hovered;
    }
  });

  window.onscroll = function () {
    let winpos = window.scrollY;
    navigation.style.opacity = 1;
    navigation.classList.toggle("nav-change", winpos > 0);

    setTimeout(() => {
      if (winpos == window.scrollY && winpos > 0 && !isNavHovered) {
        navigation.style.opacity = 0;
      }
    }, 1000);
  };

  /********Nav item's color change on scroll*******/

  const navItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            entry.target.id === "department" ||
            entry.target.id === "about-us"
          ) {
            document.querySelector("#about").classList.add("nav-item--changed");
          }
          document
            .querySelector(`#nav-link--${entry.target.id}`)
            .classList.add("nav-item--changed");
        } else {
          document
            .querySelector(`#nav-link--${entry.target.id}`)
            .classList.remove("nav-item--changed");
          document
            .querySelector("#about")
            .classList.remove("nav-item--changed");
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-100px 0px -50px 0px",
    }
  );

  navItemObserver.observe(document.querySelector("#department"));
  navItemObserver.observe(document.querySelector("#about-us"));
  navItemObserver.observe(document.querySelector("#projects"));
  navItemObserver.observe(document.querySelector("#partnership"));
  navItemObserver.observe(document.querySelector("#contact"));

  /****** DEPARTMENT BUTTONS ******/
  deptBtnList.forEach((deptBtn) => {
    deptBtn.addEventListener("click", () => {
      deptBtn.style.display = "none";
      deptBtn.nextElementSibling.classList.add("slide-up");
    });
  });

  closeBtnList.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      closeBtn.parentElement.classList.remove("slide-up");
      closeBtn.parentElement.previousElementSibling.style.display = "block";
    });
  });

  /**********PROJECTS TOGGLER***********/
  function changeContentWithin() {
    let styleRedContent = carouselProjectsToggler.childNodes[1].textContent;
    let nonstyleRedContent = carouselProjectsToggler.childNodes[0].textContent;
    let mainProjectsTitle = document.querySelector(".timeline-projects .title");

    carouselProjectsToggler.textContent =
      mainProjectsTitle.childNodes[0].textContent;
    carouselProjectsToggler.innerHTML +=
      '<span style="text-transform: initial;">' +
      mainProjectsTitle.childNodes[1].textContent +
      " </span>" +
      ' <i class="fas fa-chevron-right"></i>';

    mainProjectsTitle.textContent = nonstyleRedContent;

    mainProjectsTitle.innerHTML +=
      '<span class = "style-red">' + styleRedContent + "</span";
  }
  carouselProjectsToggler.addEventListener("click", () => {
    changeContentWithin();

    document
      .querySelector(".timeline")
      .classList.toggle("timeline-projects--showed");
    document
      .querySelector(".carousel-projects-container")
      .classList.toggle("timeline-projects--showed");
  });

  /**********CASOUREL'S NAVIGATOR EVENT LISTENTER***********/
  function activateNavigator() {
    document
      .querySelector(".navigator__item--active")
      .classList.remove("navigator__item--active", "style-red", "style-bold");

    this.classList.add("navigator__item--active", "style-red", "style-bold");

    document
      .querySelector(".partnership-container__list--show")
      .classList.remove("partnership-container__list--show");

    document
      .querySelector(`#link-${this.id}`)
      .classList.add("partnership-container__list--show");
  }

  document.querySelectorAll(".navigator__item").forEach((item) => {
    item.addEventListener("click", activateNavigator);
  });

  /******* AUTOMATIC TESTIMONIAL SLIDES********/

  let nextBtn = document.querySelector(".testimonial-btn--next");
  let prevBtn = document.querySelector(".testimonial-btn--prev");

  function moveToPrevSlide() {
    let currentShowedContainer = document.querySelector(
      ".testimonial-container.testimonial-container--show"
    );
    currentShowedContainer.classList.remove("testimonial-container--show");

    if (currentShowedContainer.previousElementSibling) {
      currentShowedContainer.previousElementSibling.classList.add(
        "testimonial-container--show"
      );
    } else {
      document
        .querySelector(".testimonial-wraper")
        .children[2].classList.add("testimonial-container--show");
    }
  }

  function changeSlide() {
    let currentShowedContainer = document.querySelector(
      ".testimonial-container.testimonial-container--show"
    );
    currentShowedContainer.classList.remove("testimonial-container--show");

    if (
      currentShowedContainer.nextElementSibling &&
      currentShowedContainer.nextElementSibling.nodeName != "I"
    ) {
      currentShowedContainer.nextElementSibling.classList.add(
        "testimonial-container--show"
      );
    } else {
      document
        .querySelector(".testimonial-wraper")
        .children[0].classList.add("testimonial-container--show");
    }
  }
  let slideAutoRunning = setInterval(changeSlide, 5000);

  nextBtn.addEventListener("click", (e) => {
    changeSlide();
    clearInterval(slideAutoRunning);
    slideAutoRunning = setInterval(changeSlide, 5000);
  });
  prevBtn.addEventListener("click", (e) => {
    moveToPrevSlide();
    clearInterval(slideAutoRunning);
    slideAutoRunning = setInterval(changeSlide, 5000);
  });

  // Logo event listener.
  document.querySelector(".logo").addEventListener("click", () => {
    window.scrollTo(0, 720);
  });
})();
