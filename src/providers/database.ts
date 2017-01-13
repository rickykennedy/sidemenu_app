import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
// import 'rxjs/add/operator/map';
/**
 * credit to Nic Raboy
 * from https://x-team.com/blog/using-remote-web-services-ionic-2-mobile-app/
*/
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {
  private storage: SQLite;
  private isOpen: boolean;
  constructor(private platform: Platform) {
    console.log('Hello Database Provider');
    if (!this.isOpen) {
        console.log("db is not open");
          this.platform.ready().then((readySource) => {
              this.storage = new SQLite();
              this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
                  this.storage.executeSql("CREATE TABLE IF NOT EXISTS pokemon (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT)", {});
                  this.isOpen = true;
              });
          });
      }
  }
  
  public getPokemon(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.storage.executeSql("SELECT * FROM pokemon", []).then((data) => {
                    let pokemon = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            pokemon.push({
                                id: data.rows.item(i).id,
                                name: data.rows.item(i).name,
                                url: data.rows.item(i).url
                            });
                        }
                    }
                    resolve(pokemon);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public createPokemon(name: string, url: string) {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.storage.executeSql("INSERT INTO pokemon (name, url) VALUES (?, ?)", [name, url]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

}
