import { Component } from '@angular/core';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition} from 'ionic-native'; 
import { TextInput } from 'ionic-angular/components/input/input';
import { Scanner } from '../scanner/scanner';
import { LoginSignup } from '../login-signup/loginsignup';
import * as $ from 'jquery';
import { Storage } from '@ionic/storage/dist/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Coordinates: Coordinates;
  watch: any;
  dimmer: HTMLElement;
  
  userID: string;
  userToken: string;

  constructor(public navCtrl: NavController, private storage: Storage) {
    storage.get('userID').then((val) => {
      this.userID = val;
    });
    storage.get('userToken').then((val) => {
      this.userToken = val;
    });
  }
  
  ionViewDidEnter() {
  
    /*Initializing geolocation*/
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.undim();

    Geolocation.getCurrentPosition(options).then((position: Geoposition) => {
        this.Coordinates = position.coords;
        this.executemap();
    });

  }

  searchBarUnfocus() {
    this.undim();
  }

  dim() {
    $("#overlay").fadeIn(500);    
  }

  undim() {
    $("#overlay").fadeOut(500);
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

    $.ajax({
      url: 'http://localhost:5000/parties/search',
      type: 'POST',
      data: {
              Name: input, 
              UserToken: this.userToken,
              UserID: this.userID,
              Lat: 43.077732, // use geopposition
              Long: -89.417760
      },
      success: function(result) {
        var partyListObject = JSON.parse(result);
        var partyList = partyListObject.partyList;
        for(var i=0; i < partyList.length; i++) {
          this.createCard(partyList[i]);
        }
      },
    });
  }

  createCard(partyObject: any) {
    var ID = partyObject.ID;
    var name = partyObject.Name;
    var latLong = partyObject.latLong;
    var date = partyObject.Date;
    var sponsor = partyObject.Sponsor;
    var Attendees = partyObject.Attendees;

    var cardhtml = "<ion-card>\
      <ion-card-header>\
        "+partyObject.name+"\
      </ion-card-header>\
      <ion-card-content>\
        <!-- Add card content here! -->\
      </ion-card-content>\
    </ion-card>"
  }

  openScanner() {
    this.navCtrl.push(Scanner);
  }
}