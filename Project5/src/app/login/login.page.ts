import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { async } from '@angular/core/testing';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from '../models/user.mode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = ""
	password: string = ""
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    public user: AuthService,
    private alertCtrl: AlertController,
    public router: Router
    ) {}

  ngOnInit() {}

  async login(){
    const { username, password } = this
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(username , password)

      if(res.user) {
        this.user.setUser({
          uid: res.user.uid
        })
        this.router.navigate(['/tabs/tab3'])
        console.log(this.user.getUID())
      }
    } catch (e) {
      let prob = this.alertCtrl.create({
        header:"User not found",
        buttons:[{ text:"OKAY"}]
       
      });
      let prob2 = this.alertCtrl.create({
        header:"Please input your email and password correctly ",
        buttons:[{ text:"OKAY"}]
       
      });
      console.dir(e)
      if(e.code === "auth/user-not-found") {
        (await prob).present();
      }
      else{
        (await prob2).present();
      }
    }
  }
}