import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { File, Transfer } from 'ionic-native';
/*
  Generated class for the Authservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var cordova: any;
@Injectable()
export class AuthService {
    private abc: string;

  constructor(public http: Http) {
    console.log('Hello Authservice Provider');
    this.http = http;
  }
  test(){
    return new Promise((resolve,reject)=>{
        this.abc = 'anc';
        return resolve(this.abc);
    
        
    });     
  }
  downloadFile() {
      var filename = "fetch_speakers.txt";
      var storageDirectory = cordova.file.documentDirectory;
      return new Promise((resolve, reject) => {
          console.log('Start download');
          const fileTransfer = new Transfer();
          //const imageLocation = `${cordova.file.applicationDirectory}www/assets/img/${image}`;
          const filelocation = "http://event.ycycnow.com/contentpackage/0000000035/0000000038/fetch_speakers.txt";

          fileTransfer.download(filelocation, storageDirectory + filename).then((entry) => {

              console.log(storageDirectory);
              File.readAsText(storageDirectory, filename)
                  .then(result => {
                      // success
                      console.log(result);
                      resolve(result);
                  }, function (error) {

                      console.log(filename + " Download ERROR: " + error.message);
                      // error
                  });
          }, (error) => {
              console.log(filename + " DownloadERROR: " + error.message);
          });
      });
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
            this.http.get('/fetch_speakers/contentpackage/0000000035/0000000038/fetch_speakers.txt', {headers: headers}).subscribe(data => {
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
