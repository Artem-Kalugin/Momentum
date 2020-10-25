// DOM Elements
const time = document.querySelector('.time'),
  calendar = document.querySelector('.day'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');
  btn = document.querySelector('.change-img');
  city = document.querySelector('.city');
  temperature = document.querySelector('.temperature');
  weatherIcon = document.querySelector('.weather-icon');
  descriptionWeath = document.querySelector('.description-weath');
  airWet = document.querySelector('.air-wet');
  windSpeed = document.querySelector('.wind-speed');
// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('.cito');
const figcaption = document.querySelector('.author');
const btnChangeCito = document.querySelector('.change-cito');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

btnChangeCito.addEventListener('click', getQuote);
// getDay
function getWeekDay(date) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}
function getMonth(date) {
  let days = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  return days[date.getMonth()];
}
let prevHour = "";
let offsetRand = Math.round(Math.random()*20);
// Show Time
function showTime() {

  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  calendar.innerHTML =  `${getWeekDay(today)}, ${today.getDate()} ${getMonth(today)}`;
  if (prevHour!=hour) setBgGreet();
  setTimeout(showTime, 1000);
  prevHour=hour;
}
function getImage(date, offsetTiming=0, offsetNumber=0) {
  let timing = ['night', 'morning', 'day', 'evening'];
  let number = (offsetRand + (parseInt(date.getHours())%6 + offsetNumber)%6)%20 + 1;
  let dayTime=((Math.floor(date.getHours()/6))+offsetTiming)%4; 
  return "assets/images/" + timing[dayTime] + "/" + addZero(number) + ".jpg";
}
// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour < 6) {
     // Morning
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Day, ';
  } else if (hour < 24) {
    // Afternoon
    greeting.textContent = 'Good Evening, ';
  } 
  document.body.style.backgroundImage =
  `url(${getImage(today)})`;
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}
function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

function setCity(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
    getWeather();
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}


// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}
let prevCity="";
city.onblur = function() {
  if (prevCity != city.innerText && city.innerText.trim().length>0)  localStorage.setItem('city', city.innerText);
  city.textContent = localStorage.getItem('city');
};
city.onfocus = function() {
  prevСity=city.innerText;
  city.textContent = " ";
};
name.onblur = function() {
  if (prevName != name.innerText && name.innerText.trim().length>0)  localStorage.setItem('name', name.innerText);
  name.textContent = localStorage.getItem('name');

};
name.onfocus = function() {
  prevName=name.innerText;
  name.textContent = " ";
};
focus.onblur = function() {
  if (prevFocus != focus.innerText && focus.innerText.trim().length>0) localStorage.setItem('focus', focus.innerText);
  focus.textContent = localStorage.getItem('focus');

};
focus.onfocus = function() {
  prevFocus=focus.innerText;
  focus.textContent = " ";
  
};
let i = 0;
let j = 0;
btn.onclick = function(){
  let today = new Date(),
  hour = parseInt(today.getHours(),10) % 6;
  i++;
  if (!((i+hour)%6)){
    j++;
  }
  if (j==4 && i==24){
    i=0;
    j=0;
  }
  document.body.style.backgroundImage =
  `url(${getImage(today,j,i)})`;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
}
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getQuote();
getCity();
let flag=0;
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerText}&lang=ru&appid=eee2e386a0e8183f8e87afe9a053e155&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  if (data.cod=="404" && flag) city.textContent="Ошибка!";
  else{
  temperature.textContent = `${data.main.temp}°C`;
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  descriptionWeath.textContent = data.weather[0].description;
  airWet.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;
  flag=1;}
  
}
getWeather();
getCity();