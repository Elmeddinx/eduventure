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


const password = document.getElementById("password");
const passwordEye = document.getElementById("passwordEye");
if (password && passwordEye) {
  passwordEye.addEventListener("click", function () {
    if (password.type === "password") {
      password.type = "text";
      passwordEye.src = "./assets/icons/eye.svg";
    } else {
      password.type = "password";
      passwordEye.src = "./assets/icons/eye-off.svg";
    }
  });
}


const uploadPhoto = document.getElementById("upload-photo");
const uploadLabel = document.getElementById("uploadLabel");
const uploadSmall = document.getElementById("uploadSmall");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const changeButton = document.getElementById("changeButton");
const deleteButton = document.getElementById("deleteButton");

if (uploadPhoto) {
  uploadPhoto.addEventListener("change", function () {
    const file = this.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewContainer.style.display = "flex";
      uploadLabel.style.display = "none";
      uploadSmall.style.display = "none";
    };
    reader.readAsDataURL(file);

  });
}
if (changeButton) {
  changeButton.addEventListener("click", function (e) {
    e.preventDefault();
    uploadPhoto.value = null;
    uploadPhoto.click();
  });
}
if (deleteButton) {
  deleteButton.addEventListener("click", function (e) {
    e.preventDefault();
    uploadPhoto.value = null;
    previewContainer.style.display = "none";
    uploadLabel.style.display = "flex";
    uploadSmall.style.display = "block";
  });
}

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const nextStep = document.getElementById("nextStep");
const prevStep = document.getElementById("prevStep");

if (nextStep) {
  nextStep.addEventListener("click", function () {
    step1.classList.remove("active");
    step2.classList.add("active");
  });
}
if (prevStep) {
  prevStep.addEventListener("click", function () {
    step2.classList.remove("active");
    step1.classList.add("active");
  });
}

const mobileNumberInput = document.getElementById('mobileNumber');
if (mobileNumberInput) {
  mobileNumberInput.addEventListener('input', function () {
    const maxLength = 13;
    if (this.value.length > maxLength) {
      this.value = this.value.slice(0, maxLength);
    }

    this.value = this.value.replace(/[^0-9+]/g, '');

    if (this.value.indexOf('+') > 0) {
      this.value = this.value.replace(/\+/g, '');
    }

    if (!this.value.startsWith('+994')) {
      this.value = '+994';
    }
  });
}
const hamburgerMenu = document.getElementById("hamburger-menu");
const sidebarMenu = document.getElementById("sidebar-menu");
const sidebarMenuInner = document.getElementById("sidebar-menu-inner");
if (hamburgerMenu) {
  hamburgerMenu.addEventListener("click", function () {
    sidebarMenu.classList.toggle("active");
  })
  document.addEventListener("click", (event) => {
    if (!sidebarMenuInner.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      sidebarMenu.classList.remove("active");
    }
  });
}
const profilePicture = document.getElementById("profile-picture");
const profilePictureDropdown = document.getElementById("profile-picture-dropdown");
if (profilePicture) {
  profilePicture.addEventListener("click", function () {
    profilePictureDropdown.classList.toggle("active");
  })
  document.addEventListener("click", (event) => {
    if (!profilePictureDropdown.contains(event.target) && !profilePicture.contains(event.target)) {
      profilePictureDropdown.classList.remove("active");
    }
  });
}
const childrenProfiles = document.getElementById("children-profiles");
const childrenProfilesDropdown = document.getElementById("children-profiles-dropdown");
if (childrenProfiles) {
  childrenProfiles.addEventListener("click", function () {
    childrenProfilesDropdown.classList.toggle("active");
  })
  document.addEventListener("click", (event) => {
    if (!childrenProfilesDropdown.contains(event.target) && !childrenProfiles.contains(event.target)) {
      childrenProfilesDropdown.classList.remove("active");
    }
  });
}

const progressBars = document.querySelectorAll('.question-progress');
if (progressBars) {
  progressBars.forEach(progressBar => {
    const currentQuestion = parseInt(progressBar.querySelector('.current-question').textContent);
    const totalQuestions = parseInt(progressBar.querySelector('.total-questions').textContent);
    const progressLine = progressBar.querySelector('.progress-line');
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    console.log("currentQuestion: " + currentQuestion + " - totalQuestions : " + totalQuestions + " - progressPercentage: " + progressPercentage)
    progressLine.style.width = `${progressPercentage}%`;
  });
}

const selectBox = document.querySelector('.data-question-select-box select');
if (selectBox) {
  selectBox.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const targetContainer = document.querySelector(`.question-container[data-question-index="${selectedValue}"]`);
    if (targetContainer) {
      targetContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
}