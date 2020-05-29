"use strict";
let map = L.map('map_container').setView([47.218371, -1.553621], 13);

class Map {
    constructor(map){
        // Initialisation de carte 
        this.mymap = map
        this.marker =  L.marker([47.218371, -1.553621]);
        this.initmap();
    }

    initmap(){
        // Chargement des tuiles
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
		    attribution: 'donn&eacute;es &copy; <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
		    minZoom: 1,
		    maxZoom: 20
        }).addTo(this.mymap);
    }
}


// Déclaration des diffentes couleurs de marqueur. Vert = Station Ouvert - Rouge = Station fermée
var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


// Requete Ajax et Fonctions Associées 

// Requete Ajax position station et status ouvert/fermée
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    // Lorsque la réponse est prête > Traitement du fichier JSON
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        // Création des marker sur la Map en fonctions des informations de l'API JC DECAULT
        response.forEach(function(item) {
            let marker;
            if (item.status == "OPEN"){
                marker = L.marker([item.position.latitude, item.position.longitude], {icon: greenIcon});
                marker.bindPopup("<b>Station Ouverte</b><br>Nombre de places: "+[item.available_bike_stands]+"<br>Nombre Vélos disponibles: "+[item.available_bikes]
                ).openPopup();
                marker.addTo(map);
            } else if (item.status == "CLOSED"){
                marker = L.marker([item.position.latitude, item.position.longitude], {icon: redIcon});
                marker.bindPopup("<b>Station Fermée</b><br>Vous ne pouvez pas réserver.").openPopup();
                marker.addTo(map);
            } 

            // Lorsque l'utilisateur sélectionne une station.
            marker.addEventListener('click', function() {
                // session Storage de l'adresse sélectionnée
                sessionStorage.setItem("address", item.address);
                // intégration des informations de la station sélectionné 
                document.getElementById('adressItem').innerHTML = item.address;
                document.getElementById('availableBikeStands').innerHTML = item.available_bike_stands;
                document.getElementById('availableBikes').innerHTML = item.available_bikes;
                // Apparition du bloc informations stations et réservation
                document.getElementById('section4').style.justifyContent = "space-around";
                document.getElementById('station_detail_container').style.display = "block";
                // Evolution de la balise h3 instruction pour l'utilisateur. 
                document.getElementById('instruction').innerHTML = "Veuillez remplir le formulaire et déposez votre signature";
            })              
          });
    }
};
request.open("GET", "https://api.jcdecaux.com/vls/v2/stations?contract=Nantes&apiKey=5f1bdce89adfd4891b2dc15692c37eba2affbf46");
request.send();




