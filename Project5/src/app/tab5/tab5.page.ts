import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
age : number;
weight : number;
height : number;
total : number;

  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async cal() {
    this.total = this.weight / (this.height * this.height)
    const alert = await this.alertController.create({
      header: 'BMI',
      message: 'BMI = ' + this.total,
      buttons: ['OK']
    });

    await alert.present();
    
  }
}
