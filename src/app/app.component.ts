import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { LoginPage } from'../pages/loginpage/loginpage';
import { TabsPage } from'../pages/tabs-page/tabs-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  showRoot = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,nativeStorage: NativeStorage) {
    platform.ready().then(() => {
       nativeStorage.getItem('logado')
        .then(data => {
          if (data) {
            this.rootPage = TabsPage;
          }

          this.showRoot = true;
        }, error => {
          this.showRoot = true;
        });

      statusBar.styleDefault();
      
       setTimeout(function () {
        splashScreen.hide();
      }, 650);
    });
  }
}

