"use strict";
class Reservation {
    constructor() {
        // <Form>
        this.form = document.getElementById("getForm");
        //Input Form
        this.inputName = document.getElementById("inputName");
        this.inputFirstName = document.getElementById("inputFirstName");
        // Valeur des inputs
        this.nameStock;
        this.firstNameStock;
        // <Span> dans Info Resa Container
        this.nameReservation = document.getElementById("nameReservationItem");
        this.firstNameReservation = document.getElementById("firstNameResaItem");
        // Timer 
        this.counterEnd = 1200;
        this.counterMin = document.getElementById("minutes");
        this.counterSec = document.getElementById("secondes");
        this.textReservation = document.getElementById("textReservation");
        this.counterTimer; 
        this.mins;
        this.secs;
        // Déclenchement navigation. 
        this.navigation();
    }

    navigation() {
        sessionStorage.clear();
        this.lastNameFirstNameLocalSto();
        this.getlastNameFirstNameForm();
    }
    
    // Methode lors du click sur Réservation 
    lastNameFirstNameLocalSto() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Vérification du dêpot de signature.
            if (mycanvas.lastX === 0 && mycanvas.lastY === 0){
                alert("Veuillez déposer votre signature dans l'encart réservé.");
                return;
            }

            // Enregistrement du Nom et Prenom dans localStorage.
            this.nameStock = this.inputName.value;
            this.firstNameStock = this.inputFirstName.value;
            if (this.nameStock && this.firstNameStock) {
                localStorage.setItem('Name', this.nameStock);
                localStorage.setItem('firstName', this.firstNameStock);
            }

            // Modification du DOM au click.
            document.getElementById("inforesa_container").style.display = "flex";
            document.getElementById("logo_inforesa").style.margin = "0";
           // document.getElementById("logo_inforesa").style.marginLeft = "20px";
            document.getElementById("instruction").innerHTML = "Bravo ! Réservation en cours";

            // Récuperation sessionStorage de l'adresse selectionner et intégration dans section 5.
            document.getElementById('adressReservationItem').innerHTML = sessionStorage.getItem("address");

            // Affichage Nom et Prénom dans le formulaire si ils existent dans localStorage
            this.getlastNameFirstNameForm();

            // Affichage Nom et Prénom dans inforese_container
            this.getlastNameFirstNameResa();
            
            // Arret du Timer si déja en cours - Timer remis à 20min en cas de nouvelle réservation.
            clearInterval(this.counterTimer); 
            this.counterEnd = 1200;

            // Déclenchement Timer
            this.launchingTimer();
        });
    }

    // Récupération des valeurs utilisateurs.
    getlastNameFirstNameForm() {
        this.inputName.value = localStorage.getItem('Name');
        this.inputFirstName.value = localStorage.getItem('firstName');
    }

    // Affichage Nom et Prénom Utilisateur dans inforesa_container
    getlastNameFirstNameResa(){
        this.nameReservation.innerHTML = localStorage.getItem('Name');
        this.firstNameReservation.innerHTML = localStorage.getItem('firstName');   
    } 

    // Déclenchement du Timer et enregistrement Session Storage
    launchingTimer(){
        if (this.counterEnd > 0){
            this.counterTimer = setInterval(()=>{
                this.counterEnd--;
                // Session Storage du Timer.
                sessionStorage.setItem("timer-mins", this.mins);
                sessionStorage.setItem("timer-secs", this.secs);
                // Arrêt du minuteur.
                if (this.counterEnd <= 0) { 
                    this.counterEnd = 0;
                    document.getElementById("inforesa_container").style.display = "none";
                    document.getElementById("logo_inforesa").style.margin = "auto";
                    document.getElementById("instruction").innerHTML = "Réservation annulée";
                    clearInterval(this.counterTimer); 
                    // Effacement des données Timer et Station selectionée dans sessionStorage.
                    sessionStorage.clear();
                    // Message pour l'utilisateur 
                    alert('Votre temps de réservation est dépassé - Votre Réservation est donc annulée');
                    // Compteur remis à 20min
                    this.counterEnd = 1200;
                    // Actualisation de la page
                    window.location.reload(true);
                }
          
                // Calcule temps restant.
                this.secs = this.counterEnd;
                this.mins  = Math.floor(this.secs / 60); // 1 min = 60 secs
                this.secs -= this.mins * 60;
          
                // Affichage Minuteur. 
                this.counterMin.innerHTML = this.mins;
                this.counterSec.innerHTML = this.secs;

              }, 1000);
        }
    }   
}



