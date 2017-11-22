import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition} from 'ionic-native'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Coordinates: Coordinates;
  watch:any;
  constructor(public navCtrl: NavController) {

  }
  
  ionViewDidEnter() {
  
    /*Initializing geolocation*/
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    

    Geolocation.getCurrentPosition(options).then((position: Geoposition) => {
        this.Coordinates = position.coords;
        this.executemap();
    });
  }

  executemap() {
     /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxlYy1jaGFuIiwiYSI6ImNqOWRkZzdkODF5cTczM3M0ZnRhaXl6Y3AifQ.OovpVT7DuGp_4cXbnjv4Pg';
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/alec-chan/cj9vtomto55if2sphh75tq9yl',
      center: [this.Coordinates.longitude, this.Coordinates.latitude],
      zoom: 16,
      pitch: 0,
      minZoom: 7.5, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });
  }

  // called when searchbox input is changed
  // queries the API for either public parties OR parties that
  // the current user is invited to and filters them by name
  loadCards(input) {
    
  }
}