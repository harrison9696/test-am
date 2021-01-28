// TYPEWRITER

class TypeWriter {
	constructor(txtElement, words, wait = 3000) {
		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	// Type Method
	type() {
		// Current index of word
		const current = this.wordIndex % this.words.length;

		// Get text of current word
		const text = this.words[current];

		// Check if deleting
		if (this.isDeleting) {
			// remove char
			this.txt = text.substring(0, this.txt.length - 1);
		} else {
			// add char
			this.txt = text.substring(0, this.txt.length + 1);
		}

		// Insert txt into element
		this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

		// Initial type speed
		let typeSpeed = 200;

		if (this.isDeleting) {
			typeSpeed /= 3;
		}

		// If word is complete
		if (!this.isDeleting && this.txt === text) {
			// pause when word is complete
			typeSpeed = this.wait;

			// set delete to true
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			// set delete to false
			this.isDeleting = false;

			// move to next word
			this.wordIndex++;

			// pause before typing starts again
			typeSpeed = 333;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
	const txtElement = document.querySelector('.typewriter');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	// Init TypeWriter
	new TypeWriter(txtElement, words, wait);
}

// HAMBURGER NAV

const burger = document.querySelector('.navbar__hamburger');
const nav = document.querySelector('.navbar__navigation-list');
const navLinks = document.querySelectorAll('.navbar__navigation-item');

const navSlide = () => {
	// Toggle Nav
	burger.addEventListener('click', () => {
		nav.classList.toggle('nav-active');

		// Animate links
		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${
					index / 7 + 0.1
				}s`;
			}
		});

		// Animate hamburger
		burger.classList.toggle('active');
	});
};

// // Close Nav If A Link Is Clicked
// navLinks.forEach(navLink => {
// 	navLink.addEventListener('click', e => {
// 		if (
// 			nav.classList.contains('nav-active') &&
// 			burger.classList.contains('active')
// 		) {
// 			nav.classList.toggle('nav-active');
// 			burger.classList.toggle('active');
// 		}
// 	});
// });

navSlide();
