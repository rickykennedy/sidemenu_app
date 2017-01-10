import { Component } from '@angular/core';
import { Http } from "@angular/http";  
import { NavController, AlertController } from 'ionic-angular'; 
import "rxjs/Rx";  
import { Database } from "../../providers/database";
import { AuthService } from "../../providers/authservice";

/*
  Generated class for the Pokemon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pokemon',
  templateUrl: 'pokemon.html',
  providers: [AuthService]
})
export class Pokemon {
  public pokemon: Array<any>;
  public constructor(private navCtrl: NavController, private alertCtrl: AlertController, private http: Http, private database: Database, public authservice: AuthService) {
        this.pokemon = [];
    }

    public ionViewDidEnter() {
        setTimeout(() => {
            this.loadPokemonData();
        }, 100);
    }
    public loadPokemonData() {
      this.authservice.downloadFile().then(data => {
        console.log("data: " + data);
      });
    /*
        // this.database.getPokemon().then(result => {
            // this.pokemon = result;
            // if (this.pokemon.length == 0) {
              return new Promise((resolve, reject) => {
                // this.http.get("/pokemon/api/v2/pokemon?limit=11")
                this.http.get("/api/auth/getPokemon")
                  .map(result => result.json())
                  .flatMap(result => result.results)
                  .map(result => <any>result)
                  .subscribe(result => {
                    // this.database.createPokemon(result.name, result.url);
                    this.pokemon.push(result);
                  }, error => {
                    console.error(error);
                  });
              });
        //     }
        // });
      */
    }

    public showInfo(name: string) {
        this.http.get("/pokemon/api/v2/pokemon/" + name)
            .map(result => result.json())
            .flatMap(result => result.types)
            .map(result => (<any> result).type.name)
            .toArray()
            .subscribe(result => {
                this.showDialog(result);
            }, error => {
                console.error(error);
            });
    }

    public showDialog(data: Array<string>) {
        let alert = this.alertCtrl.create({
            title: 'Information',
            subTitle: 'This Pokemon is of type(s) ' + data.join(", "),
            buttons: ['OK']
        });
        alert.present();
    }

}
