import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Profile } from '../pages/profile/profile';
import { Pokemon } from '../pages/pokemon/pokemon';
import { Database } from '../providers/database';
// import { Pokemon-add } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    Profile,
    Pokemon
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    Profile,
    Pokemon
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Database]
})
export class AppModule {}
