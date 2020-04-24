import { Component, OnInit } from '@angular/core';

import { ConfigService } from 'src/app/services/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private config: ConfigService,
    private router: Router) { }

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
}
