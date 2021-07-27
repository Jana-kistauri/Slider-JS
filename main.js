
function createSlider() {
	let slides = [
		"images/image-1.jpg",
		"images/image-2.jpg",
		"images/image-3.jpg",
		"images/image-4.jpg",
		"images/image-5.jpg",
		"images/image-6.jpg"
	];

	let slider = document.getElementById("slider");
	let rail = document.getElementById("rail");
	let currentPosition = 0;
	let pageWidth = 650;
	let nextTimeout;

	let moving = false;
	let startPosition = null;
	let movingElement = null;

	resetTimeOut();

	function createSlide(url) {
		let slide = document.createElement("div");
		slide.className = "slide";
		slide.style.backgroundImage = "url("+ url + ")";

		return slide;
	}

	function createSlides() {
		for(let i = 0; i < slides.length; i++) {
			let slideIndex = createSlide(slides[i])
			rail.appendChild(slideIndex);
		}
	}
	createSlides();


	
	rail.addEventListener('mousedown', function(e) {
		moving = true;
		startPosition = { x: e.pageX };
		movingElement = this;
		this.classList.add("no-transition");
		this.classList.add("active");
	});

	
	document.addEventListener('mouseup', function(e) {
		moving = false;
		movingElement.classList.remove('active');
		movingElement.classList.remove("no-transition");
		
		movingElement = null;
		
		
		let translateX = getTranslateX(rail);
	
	});

	function getTranslateX() {
	  let style = window.getComputedStyle(rail);
	  let matrix = new WebKitCSSMatrix(style.transform);
	  return matrix.m41;
	}


	document.addEventListener('mousemove', function(e) {
		if(moving) {
			let diffX = e.pageX - startPosition.x;
			movingElement.style.transform = 'translateX(' + diffX + 'px)';
		}
	});

	function next() {
		
		let scrollWidth = document.getElementById("rail").scrollWidth;
		let lastPosition = scrollWidth - window.innerWidth;

		if(currentPosition === lastPosition) {
			currentPosition = 0;
		} else {
			currentPosition = Math.min(currentPosition + pageWidth, lastPosition);
		}
		rail.style.transform = 'translateX(-' + currentPosition + 'px)';

		// resetTimeOut();
	}

	function prev() {
		
		let scrollWidth = document.getElementById('rail').scrollWidth;
		let lastPosition = scrollWidth - window.innerWidth;

		if(currentPosition == 0) {
			currentPosition = lastPosition;
		}else {
			currentPosition = Math.max(currentPosition - pageWidth, 0);
		}
		rail.style.transform = 'translateX(-' + currentPosition + 'px)';
		resetTimeOut();
	}

	function resetTimeOut() {
		clearTimeout(nextTimeout);
		nextTimeout = setTimeout(next, 5000);	
	};

	function createNavigation() {
		let nextButton = document.createElement("button");
		nextButton.className = "next";
		nextButton.innerText = "Next";
		nextButton.addEventListener("click", next);
		slider.appendChild(nextButton);

		let prevButton = document.createElement("button");
		prevButton.className = "prev";
		prevButton.innerText = "Prev";
		prevButton.addEventListener("click", prev);
		slider.appendChild(prevButton);

	}
	createNavigation();

	return {next: next, prev: prev};
}

createSlider();


