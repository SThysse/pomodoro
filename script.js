const cards = document.querySelectorAll(".cards");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
});

cards.forEach((card) => {
  observer.observe(card);
});

const gallery = document.querySelector(".gallery");
const galleryItems = document.querySelectorAll(".gallery-item");
const numOfItems = gallery.children.length;
const itemWidth = 23; // percent: as set in css

const featured = document.querySelector(".featured-item");

const leftBtn = document.querySelector(".move-btn.left");
const rightBtn = document.querySelector(".move-btn.right");
let leftInterval;
let rightInterval;

const scrollRate = 0.2;
let left;

function selectItem(e) {
  if (e.target.classList.contains("active")) return;

  featured.style.backgroundImage = e.target.style.backgroundImage;

  for (let i = 0; i < galleryItems.length; i++) {
    if (galleryItems[i].classList.contains("active"))
      galleryItems[i].classList.remove("active");
  }
  e.target.classList.add("active");
}

function galleryWrapLeft() {
  const first = gallery.children[0];
  gallery.removeChild(first);
  gallery.style.left = -itemWidth + "%";
  gallery.appendChild(first);
  gallery.style.left = "0%";
}

function galleryWrapRight() {
  const last = gallery.children[gallery.children.length - 1];
  gallery.removeChild(last);
  gallery.insertBefore(last, gallery.children[0]);
  gallery.style.left = "-23%";
}

function moveLeft() {
  left = left || 0;

  leftInterval = setInterval(function () {
    gallery.style.left = left + "%";

    if (left > -itemWidth) {
      left -= scrollRate;
    } else {
      left = 0;
      galleryWrapLeft();
    }
  }, 1);
}

function moveRight() {
  //Make sure there is element to the leftd
  if (left > -itemWidth && left < 0) {
    left = left - itemWidth;

    const last = gallery.children[gallery.children.length - 1];
    gallery.removeChild(last);
    gallery.style.left = left + "%";
    gallery.insertBefore(last, gallery.children[0]);
  }

  left = left || 0;

  leftInterval = setInterval(function () {
    gallery.style.left = left + "%";

    if (left < 0) {
      left += scrollRate;
    } else {
      left = -itemWidth;
      galleryWrapRight();
    }
  }, 1);
}

function stopMovement() {
  clearInterval(leftInterval);
  clearInterval(rightInterval);
}

leftBtn.addEventListener("mouseenter", moveLeft);
leftBtn.addEventListener("mouseleave", stopMovement);
rightBtn.addEventListener("mouseenter", moveRight);
rightBtn.addEventListener("mouseleave", stopMovement);

//Start this baby up
(function init() {
  const images = [
    "/img/amorepizza-1024x640.jpg",
    "/img/cheeseplatter2-1024x640.jpg",
    "/img/interior1-1024x640.jpg",
    "/img/m_DSC_6173.jpg",
    "/img/coffee1-1024x640.jpg",
    "/img/interior2-1024x640.jpg",
    "/img/pasta1-1024x640.jpg",
    "/img/wines-1024x640.jpg",
    "/img/parmawinepizza-1-1024x640.jpg",
    "/img/veal2-1024x640.jpg",
  ];

  //Set Initial Featured Image
  featured.style.backgroundImage = "url(" + images[0] + ")";

  //Set Images for Gallery and Add Event Listeners
  for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.backgroundImage = "url(" + images[i] + ")";
    galleryItems[i].addEventListener("click", selectItem);
  }
})();
