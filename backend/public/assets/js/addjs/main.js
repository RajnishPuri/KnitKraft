let preloader = document.getElementById("preloader");
if (preloader) {
  preloader.style.display = "flex";
  setTimeout(function () {
    preloader.style.display = "none";
  }, 500);
}

// welcome slider
let welcomeSlider = document.querySelector(".welcome-slide");
if (welcomeSlider) {
  var swiper = new Swiper(welcomeSlider, {
    slidesPerView: 1,
    autoplay: {
      delay: 10000,
    },
    pagination: {
      el: ".pagination",
      clickable: true,
    },
  });
}



// Game slider
let gameSlider = document.querySelector(".game-slider");
if (gameSlider) {
  var swiper = new Swiper(gameSlider, {
    slidesPerView: 5,
  });
}

// Match slider
let matchSlider = document.querySelector(".match-slider");
if (matchSlider) {
  var swiper2 = new Swiper(matchSlider, {
    slidesPerView: 1.7,
    spaceBetween: 10,
  });
}

// Marquee slider functionality
function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  if (parentSelector) {
    const clone = parentSelector.innerHTML;
    const firstElement = parentSelector.children[0];
    let i = 0;
    console.log(firstElement);
    parentSelector.insertAdjacentHTML("beforeend", clone);
    parentSelector.insertAdjacentHTML("beforeend", clone);

    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }
}

//after window is completed load
//1 class selector for marquee
//2 marquee speed 0.2
window.addEventListener("load", Marquee(".marquee", 0.2));

// News slider
let newsSlider = document.querySelector(".news-slider");
if (newsSlider) {
  var swiper = new Swiper(newsSlider, {
    slidesPerView: 1.4,
    spaceBetween: 20,
  });
}

// video slider
let videosSlider = document.querySelector(".video-slider");
if (videosSlider) {
  var swiper = new Swiper(".video-slider", {
    slidesPerView: 1.4,
    spaceBetween: 20,
  });
}

// Sports slider
let sportsSlider = document.querySelector(".sports-slide");
if (sportsSlider) {
  var swiper = new Swiper(sportsSlider, {
    loop: true,
    slidesPerView: 1,
    autoplay: true,
    pagination: {
      el: ".pagination",
      clickable: true,
    },
  });
}



