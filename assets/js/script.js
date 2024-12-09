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