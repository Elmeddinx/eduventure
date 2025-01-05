document.addEventListener("DOMContentLoaded", function () {
  const languageDropdown = document.getElementById("languageDropdown");
  const dropdownMenu = document.getElementById("dropdownMenu");

  const languages = {
    az: { name: "AZ", flag: "./assets/icons/az.svg" },
    en: { name: "EN", flag: "./assets/icons/en.svg" },
    ru: { name: "RU", flag: "./assets/icons/ru.svg" },
  };

  if (dropdownMenu) {
    dropdownMenu.addEventListener("click", function (e) {
      if (e.target.closest(".dropdown-item")) {
        e.preventDefault();
        const selectedLang = e.target
          .closest(".dropdown-item")
          .getAttribute("data-lang");
        const selectedLanguage = languages[selectedLang];

        languageDropdown.innerHTML = `<img src="${selectedLanguage.flag}" alt="${selectedLanguage.name}" class="flag-icon"> ${selectedLanguage.name}`;

        const updatedDropdownMenu = Object.keys(languages)
          .filter((lang) => lang !== selectedLang)
          .map((lang) => {
            return `
                          <li>
                              <a class="dropdown-item" href="#" data-lang="${lang}">
                                  <img src="${languages[lang].flag}" alt="${languages[lang].name}" class="flag-icon"> ${languages[lang].name}
                              </a>
                          </li>
                      `;
          })
          .join("");

        dropdownMenu.innerHTML = updatedDropdownMenu;
      }
    });
  }
});

var swiper = new Swiper(".landing-swiper", {
  slidesPerView: 1.2,
  spaceBetween: 19,
});
var swiper = new Swiper(".landing-employee-swiper", {
  slidesPerView: 4,
  spaceBetween: 32,
  pagination: false,
  breakpoints: {
    320: {
      slidesPerView: 1.18,
      spaceBetween: 16,
    },
    625: {
      slidesPerView: 1.8,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 1.8,
    },
    825: {
      slidesPerView: 2.25,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});


const playButton = document.getElementById("play-button");
const playButtonMb = document.getElementById("play-button-mb");
const videoContainer = document.getElementById("video-container");
const closeVideoButton = document.getElementById("close-video");
const customVideo = document.getElementById("custom-video");
const titleContainer = document.querySelector(".title-container");
const mediaQuery = window.matchMedia("(min-width: 768px)");


if (playButton) {
  playButton.addEventListener("click", () => {
    closeVideoButton.style.display = "flex";
    customVideo.play();
    if (mediaQuery.matches) {
      videoContainer.classList.remove("col-md-7");
      videoContainer.classList.add("col-md-12");
      titleContainer.style.display = "none";
    }
  });
}
if (playButtonMb) {
  playButtonMb.addEventListener("click", () => {
    if (mediaQuery.matches) {
    } else {
      closeVideoButton.style.display = "flex";
      customVideo.play();
      playButtonMb.style.display = "none";
    }
  });
}
if (closeVideoButton) {
  closeVideoButton.addEventListener("click", () => {
    customVideo.pause();
    customVideo.currentTime = 0;
    closeVideoButton.style.display = "none";
    if (mediaQuery.matches) {
      videoContainer.classList.add("col-md-7");
      videoContainer.classList.remove("col-md-12");
      titleContainer.style.display = "block";
    } else {
      playButtonMb.style.display = "flex";
    }
  });
}