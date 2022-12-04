const bgImg = document.querySelector(".bgImg");

const images = [
    "beach",
    "sky",
    "venice",
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

bgImg.style.backgroundImage = `url(./img/${chosenImage}.jpg)`;
