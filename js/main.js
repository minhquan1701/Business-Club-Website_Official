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
})();
