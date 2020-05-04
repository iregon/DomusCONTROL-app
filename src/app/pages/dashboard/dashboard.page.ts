import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/services/config/config.service';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private subscription: any;

  constructor(
    private config: ConfigService,
    private router: Router,
    private platform: Platform) { }

  ngOnInit() {
  }

  /**
   * getConfig
   */
  public getConfig() {
    return this.config.getConfig();
  }

  public goToRoomPage(floor: string, room: string) {
    this.router.navigate(['/room', {floor: floor, room: room}]);
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
