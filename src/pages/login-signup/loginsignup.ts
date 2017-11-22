import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-loginsignup',
  templateUrl: 'loginsignup.html'
})
export class LoginSignup {
  Coordinates: any;
  watch:any;
  constructor(public navCtrl: NavController) {

  }
}