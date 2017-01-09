import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../../providers/authservice';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AuthService]
})
export class Profile {
  
  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {
    
  }
  fetchList(){
        this.authservice.fetch_speakers().then(data =>{
            console.log("here it goes");
            console.log(data);
            if(data){
            // if(data.status == 200 && data.statusText=="OK"){
                console.log('success');
            }else{
                console.log("failed");
            }
        });
    }
    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Low battery',
        subTitle: '10% of battery remaining',
        buttons: ['Dismiss']
      });
      alert.present();
    }
}
