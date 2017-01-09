import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Authservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  constructor(public http: Http) {
    console.log('Hello Authservice Provider');
    this.http = http;
  }

    fetch_speakers() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     headers.append('Content-Type', 'application/json');
    //     headers.append("Access-Control-Allow-Origin", "*");
    //    headers.append("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    //    headers.append("Access-Control-Allow-Headers", "Content-Type");
    //    headers.append("Accept", "application/json'");
    

        return new Promise(resolve => {
            this.http.post('/fetch_speakers/contentpackage/0000000035/0000000038/fetch_speakers.txt', {headers: headers}).subscribe(data => {
                console.log("fetch_speakers data: ");
                console.log(data);
                // console.log
                if(data.status == 200 && data.statusText == "OK"){
                    console.log("success");
                    
                    console.log(data.json());
                    // return data.json();
                    // this.storeUserCredentials(data.json().token);
                    resolve(true);
                }
                else{
                    console.log("fail to fetch data");
                    resolve(false);
                }
            });
        });
    }
}
