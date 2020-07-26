window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".loading-page").style.opacity = "0";
    document.querySelector(".loading-page").style.display = "none";

    document.querySelector(".main-page").style.display = "block";
    setTimeout(() => {
      document.querySelector(".main-page").style.opacity = "1";
    }, 500);
  }, 2000);
});

(function () {
  const deptBtnList = document.querySelectorAll(".btn-lg");
  const closeBtnList = document.querySelectorAll(".close-btn");
  const navigation = document.querySelector(".nav-top");
  const navItemList = document.querySelectorAll(".nav-link");

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

  /* const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          navigation.classList.add("nav-change");
        } else {
          navigation.classList.remove("nav-change");
        }
      });
    },
    {
      threshold: 1,
      rootMargin: "-100px 0px 0px 0px",
    }
  );
 */

  window.onscroll = function () {
    navigation.style.opacity = 1;

    navigation.classList.add("nav-change");
    if (window.scrollY === 0) {
      navigation.classList.remove("nav-change");
    }
  };

  /* navObserver.observe(document.querySelector(".headline")); */

  /********Nav item's color change on scroll*******/

  const navItemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            entry.target.id === "about-us" ||
            entry.target.id === "department"
          ) {
            /* console.log(entry.target.id);
            document.querySelector("#about").classList.add("nav-item--changed");*/
            console.log(
              document
                .querySelector(`#nav-link--${entry.target.id}`)
                .parentElement.previousElementSibling.classList.add(
                  "nav-item--changed"
                )
            );
            document
              .querySelector(`#nav-link--${entry.target.id}`)
              .parentElement.parentElement.classList.add("nav-item--changed");
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

  navItemList.forEach((navItem) =>
    navItem.addEventListener("click", () => {
      setTimeout(() => {
        navigation.style.opacity = 0;
      }, 1000);
    })
  );

  /**********CASOUREL'S NAVIGATOR EVENT LISTENTER***********/
  function activateNavigator() {
    document
      .querySelector(".navigator__item--active")
      .classList.remove("navigator__item--active", "style-red", "style-bold");

    this.classList.add("navigator__item--active", "style-red", "style-bold");

    document
      .querySelector(".partnership-container__list--show")
      .classList.remove("partnership-container__list--show");

    console.log(document.querySelector(`#link-${this.id}`));
    document
      .querySelector(`#link-${this.id}`)
      .classList.add("partnership-container__list--show");
  }

  document.querySelectorAll(".navigator__item").forEach((item) => {
    item.addEventListener("click", activateNavigator);
  });

  /******* AUTOMATIC TESTIMONIAL SLIDES********/
  setInterval(changeSlide, 5000);

  function changeSlide() {
    document.querySelectorAll(".testimonial-container").forEach((container) => {
      container.classList.toggle("testimonial-container--show");
    });
  }
})();
