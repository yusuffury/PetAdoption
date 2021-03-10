import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-hoome',
  templateUrl: './hoome.page.html',
  styleUrls: ['./hoome.page.scss'],
})
export class HoomePage implements OnInit {

  pet: string = "pet";
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
  ngOnInit() {
  }

}
