import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ConfigService } from './services/config/config.service';
import { DataService } from './services/data/data.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit{
    
  public appPages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'home'
    },
    {
      title: 'Settings',
      url: 'options',
      icon: 'settings'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private config: ConfigService
  ) {
    
  }

  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // set status bar to primary color
      this.statusBar.backgroundColorByHexString('#3880ff');
      // this.statusBar.styleDefault();

      this.splashScreen.hide();

      // Generate app uuid if not generated
      if (localStorage.getItem("appId") == undefined || localStorage.getItem("darkMode") == "")
        localStorage.setItem("appId", uuid.v4());
    });
  }

  public getInstallationConfig() {
    return this.config.getConfig().project;
  }
}
