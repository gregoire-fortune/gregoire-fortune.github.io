const text = ["un étudiant en BUT Informatique", "un futur développeur", "quelqu'un d'ambitieux"];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenText = 1234;

const dynamicText = document.getElementById("dynamic-text");

function type() {
    if (charIndex < text[textIndex].length) {
    dynamicText.textContent += text[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
    } else {
    setTimeout(erase, delayBetweenText);
    }
}

function erase() {
    if (charIndex > 0) {
    dynamicText.textContent = text[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
    } else {
    textIndex = (textIndex + 1) % text.length;
    setTimeout(type, typingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, delayBetweenText);
});