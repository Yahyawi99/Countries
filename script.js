/******************/
// Variables
/******************/
const Icons = {
  moon: "images/icon-moon.svg",
  sun: "images/icon-sun.svg",
};
const Mode_Icon = document.querySelector(".icon");
const Body = document.querySelector(".wrapper");
const Header = document.querySelector("header");

const Search_Input = document.querySelector("#search-input");
const Search_Icon = document.querySelector(".search-icon");

const Drop_Down = document.querySelector(".filter");
const Options = document.querySelector(".choices");
const Arrow = document.querySelector(".arrow-down");

const Back_Btn = document.querySelector(".back");
const Back_Arrow = document.querySelector(".arrow-left");
const Details = document.querySelector(".details");
const Border_Countries = document.querySelector(".border-countries");

/******************/
// Events
/******************/
Mode_Icon.addEventListener("click", darkMode);

Drop_Down.addEventListener("click", filterOption);

/******************/
// Functions
/******************/
function darkMode(event) {
  // Body
  Body.classList.toggle("dark-body");
  // Header
  Header.classList.toggle("dark-header");
  // Search
  Search_Input.classList.toggle("dark-input");
  Search_Icon.classList.toggle("dark-icon");
  // Filter
  Drop_Down.classList.toggle("dark-filter");
  Options.classList.toggle("dark-choices");
  Arrow.classList.toggle("dark-arrow-down");

  // countrie data
  Back_Btn.classList.toggle("dark-back");
  Back_Arrow.classList.toggle("dark-arrow-left");
  Details.classList.toggle("dark-details");
  Border_Countries.classList.toggle("dark-border-countries");

  if (Body.classList.contains("dark-body")) {
    event.currentTarget.src = Icons.sun;
  } else {
    event.currentTarget.src = Icons.moon;
  }
}

// Filter Option
function filterOption() {
  Options.classList.toggle("show-option");
}
