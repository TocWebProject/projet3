"use strict";
// Scroll automatique vers la section 4 Carte et Bloc Réservation lors du click sur la fleche down.
document.querySelectorAll('a[href^="#section4"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 