//Adding a black bar over menu while scrolling down.
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

let map;

function initMap() {
  map = new google.maps.Map(document.querySelector(".contact-map"), {
    center: { lat: 40.7128, lng: -74.006 },
    zoom: 18,
  });
}

//CALENDAR

const monthDays = document.querySelector(".days");

const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h2").innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  //gets previous days of the months + greys out previous days from previous months
  for (let x = firstDayIndex; x > 0; x--) {
    if (new Date().getMonth() >= date.getMonth()) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    } else {
      days += `<div class="day">${prevLastDay - x + 1}</div>`;
    }
  }

  //gets current days of the months + greys out previous days this month
  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else if (
      (i < new Date().getDate() && date.getMonth() === new Date().getMonth()) ||
      new Date().getMonth() > date.getMonth()
    ) {
      days += `<div class="prev-date">${i}</div>`;
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  //gets next days of the months + greys out previous months
  for (let j = 1; j <= nextDays; j++) {
    if (new Date().getMonth() <= date.getMonth()) {
      days += `<div class ="day">${j}</div>`;
      monthDays.innerHTML = days;
    } else {
      days += `<div class ="prev-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  }
};

renderCalendar();

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

//get a selected background on click
const days = document.getElementsByClassName("day");
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("day")) return;
  for (let i = 0; i < days.length; i++) {
    days[i].classList.remove("selected");
    e.target.classList.add("selected");
  }
});
