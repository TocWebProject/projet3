"use strict";
class Slide {
	constructor (counter, playing){
		//initialisation du carousel.
		this.counter = counter;
		this.playing = playing;
		this.size = document.querySelector('.carousel-slide').clientWidth;
		this.carouselSlide = document.querySelector('.carousel-slide');
		// initialisation des boutons navigations
		this.nextBtn = document.querySelector('#nextBtn');
		this.prevBtn = document.querySelector('#prevBtn');
		this.pauseBtn = document.querySelector('#pauseBtn');
		this.navigation();
	}

	// Fonction regroupant la logique de l'app par l'ensemble des méthodes de la class.
	navigation(){
		this.firstSlide();
		this.clicknext();
		this.clickprev();
		this.clickpause();
		this.play();
		this.KeyboardsEvent();
	}
	
	// Affichage du premier Slide.
	firstSlide(){
		this.size = document.querySelector('.carousel-slide').clientWidth;
		this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
	}

	// Déplacement du carousel vers la droite.
	nextSlide (){
		this.size = document.querySelector('.carousel-slide').clientWidth;
		this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
		this.counter++;
		this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
		this.transitionEnds();
	}

	// Déplacement du carousel vers la gauche.
	prevSlide(){
		this.size = document.querySelector('.carousel-slide').clientWidth;
		this.carouselSlide;
		this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
		this.counter--;
		this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
		this.transitionEnds();
	}
	
	// Méthode permettant une boucle dans notre carousel. 
	transitionEnds (){
		if (this.counter <= 0){
			this.size = document.querySelector('.carousel-slide').clientWidth;
			this.carouselSlide.style.transition = "none";
			this.counter = 5;
			this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
		} else if (this.counter >= 6) {
			this.size = document.querySelector('.carousel-slide').clientWidth;
			this.carouselSlide.style.transition = "none";
			this.counter = 1;
			this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
		}
	}

	// Methode navigation de l'icon fleche droite 
	clicknext(){
		this.nextBtn.addEventListener('click', ()=>{
		if (this.counter >= 6) return; // No bug lorsqu'on click trop vite
		this.nextSlide();
	});
	}
	// Methode navigation de l'icon fleche gauche
	clickprev(){
		this.prevBtn.addEventListener('click', ()=>{
			if(this.counter <=0) return; // No bug lorsqu'on click trop vite
			this.prevSlide();
		});
	}
	
	// Methodes de lecture automatique et de pause du carousel via SetInterval
	play(){
		this.playing = true;
		this.slideInterval = setInterval(this.nextSlide.bind(this),5000);
		this.pauseBtn.innerHTML = 'Pause';
	}

	pause(){
		clearInterval(this.slideInterval);
		this.playing = false;
		this.pauseBtn.innerHTML = 'Lecture';

	}

	// Methode permettant de mettre sur pause / lecture le carousel au click sur le bouton.
	clickpause(){
		this.pauseBtn.addEventListener('click', ()=>{
			if (this.playing == true){
				this.pause();
			} else {
				this.nextSlide();
				this.play();
			}
		});
	}

	// Methode de navigation avec le clavier: flèche gauche / flèche droite et Play/Pause avec barre d'espace. 
	KeyboardsEvent(){
		document.addEventListener('keydown', ()=>{
			if (event.keyCode === 37){
				this.prevSlide();
			} else if (event.keyCode === 39){
				this.nextSlide();
			}  else if (event.keyCode === 32 && this.playing === true){
				event.preventDefault(); // empèche le scroll down automatique lorsque la barre d'espace est enfoncée. 
				this.pause()
			} else if (event.keyCode === 32 && this.playing === false){
				event.preventDefault(); // empèche le scroll down automatique lorsque la barre d'espace est enfoncée.
				this.play();
				this.nextSlide();
			}
		}); 
	}
}
















