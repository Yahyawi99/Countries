/******************/
// Variables
/******************/

const Back = document.querySelector(".back");
const Countries = document.querySelectorAll(".countrie");
const MY_ALL_COUNTRIES = document.querySelector(".all-countries");
const Countrie_Detail = document.querySelector(".countrie-detail");

const All_Region = document.querySelector(".choices");
const Search = document.querySelector("#search-input");

const MY_MAIN = document.querySelector(".main");

const Officiel_Name = document.querySelector(".detail-name");
const Name = document.querySelector(".detail-native");
const Flag = document.querySelector(".detail-flag");
const Population = document.querySelector(".detail-population");
const Region = document.querySelector(".detail-region");
const Sub_Region = document.querySelector(".sub-region");
const Capital = document.querySelector(".detail-capital");
const Domain = document.querySelector(".domain");
const Currencie = document.querySelector(".currencie");
const Languague = document.querySelector(".language");
const Border = document.querySelector(".border");

/******************/
// Events
/******************/
Back_Btn.addEventListener("click", backToHome);

All_Region.addEventListener("click", getRegion);
Search.addEventListener("keyup", searchForCountrie);

window.addEventListener("DOMContentLoaded", allData);

/******************/
// Functions
/******************/
// back function
function backToHome() {
  Countrie_Detail.style.display = "none";
  MY_ALL_COUNTRIES.style.display = "";

  // clear all element
  Officiel_Name.textContent = "";
  Name.textContent = "";
  Flag.src = "";
  Population.textContent = "";
  Region.textContent = "";
  Sub_Region.textContent = "";
  Capital.textContent = "";
  Domain.textContent = "";
  Currencie.textContent = "";
  Languague.innerHTML = "Languages :";
  Border.innerHTML = "Border Countries :";
}

// Countrie detail
function countrieDetail() {
  Countrie_Detail.style.display = "initial";
  MY_ALL_COUNTRIES.style.display = "none";
}

// Get Region
function getRegion(event) {
  let myChoice = event.target;
  if ([...MY_MAIN.children].length > 0 && myChoice !== event.currentTarget) {
    let myRegion = myChoice.dataset.name;

    [...MY_MAIN.children].forEach((e) => {
      e.style.display = "none";
    });

    [...MY_MAIN.children].forEach((countrie) => {
      if (countrie.dataset.region == myRegion) {
        countrie.style.display = "";
      }
    });
    if (myRegion === "all") {
      [...MY_MAIN.children].forEach((e) => {
        e.style.display = "";
      });
    }
  }
}

// Search for a country
function searchForCountrie(event) {
  if (event.key === "Enter") {
    let myCountrie = event.currentTarget.value;
    if (myCountrie) {
      myCountrie = myCountrie.trim();
      let firstLetter = myCountrie[0].toUpperCase();
      let myId = myCountrie.replace(myCountrie.charAt(0), firstLetter);

      console.log(myId);

      [...MY_MAIN.children].forEach((e) => {
        e.style.display = "none";
      });

      [...MY_MAIN.children].forEach((countrie) => {
        if (countrie.dataset.id.includes(myId)) {
          countrie.style.display = "";
        }
      });
    } else {
      [...MY_MAIN.children].forEach((e) => {
        e.style.display = "";
      });
    }
  }
}

// get the data from the API
async function allData() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  let myCapital;

  for (let i in data) {
    // get capital
    if (data[i].capital) {
      myCapital = data[i].capital;
    } else {
      myCapital = "Unknown";
    }

    MY_MAIN.innerHTML += `<div data-id="${data[i].name.common}" data-region="${data[i].region}" class="countrie"> <img class="flag" src="${data[i].flags.png}" /><div class="txt"><h3 data-name="${data[i].name.common}" class="name">${data[i].name.common}</h3><p> Population : <span class="population">${data[i].population}</span></p><p>Region : <span class="region">${data[i].region}</span></p><p>Capital : <span class="capital">${myCapital}</span></p></div></div>`;
  }

  const Countrie = document.querySelectorAll(".countrie");

  // Drak mode
  Mode_Icon.addEventListener("click", darkModeFunc);
  function darkModeFunc() {
    // Countrie
    Countrie.forEach((e) => {
      e.classList.toggle("dark-countrie");
    });
  }

  // Detail Function
  Countrie.forEach((countrie) => {
    countrie.addEventListener("click", function (event) {
      let index = [...MY_MAIN.children].indexOf(event.currentTarget);
      let nativeName =
        data[index].altSpellings[data[index].altSpellings.length - 1];
      let myFlag = data[index].flags.svg;
      let myPopulation = data[index].population;
      let myRegion = data[index].region;
      let mySubRegion = data[index].subregion;
      let myCapital =
        event.currentTarget.children[1].children[
          event.currentTarget.children[1].children.length - 1
        ].children[0].textContent;
      let topLevelDomain = data[index].tld[0];
      let myCurrencie;
      for ($ in data[index].currencies) {
        myCurrencie = data[index].currencies[$].name;
      }
      let myLanguagues = [];
      for (lan in data[index].languages) {
        myLanguagues.push(data[index].languages[lan]);
      }

      // My detail
      Officiel_Name.textContent = data[index].name.common;
      Name.textContent = nativeName;
      Flag.src = myFlag;
      Population.textContent = myPopulation;
      Region.textContent = myRegion;
      Sub_Region.textContent = mySubRegion;
      Capital.textContent = myCapital;
      Domain.textContent = topLevelDomain;
      Currencie.textContent = myCurrencie;
      for (let i = 0; i < myLanguagues.length; i++) {
        Languague.innerHTML += `<span>${myLanguagues[i]}, </span>`;
      }
      if (data[index].hasOwnProperty("borders")) {
        for (let i = 0; i < data[index].borders.length; i++) {
          Border.innerHTML += `<span>${data[index].borders[i]}</span>`;
        }
      } else {
        Border.innerHTML = "Border Countries : Unknown";
      }

      countrieDetail();
    });
  });
}
