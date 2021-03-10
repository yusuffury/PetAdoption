import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { 
  LoadingController, 
  NavController, 
  ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
user = {} as User;
total : number = 0
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore
    ) {}

  ngOnInit() {}

  async register(user: User){
    if(this.formValidation()){
      //show loader
      let loader = this.loadingCtrl.create({
        message: "Please wait..."
      });
      (await loader).present();

      try{
        
        await this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(data =>{
          console.log(data)
          this.firestore.collection('users/').doc(data.user.uid).set({
            name: this.user.name,
            no_tel: this.user.no_tel,
            email: this.user.email,
            password: this.user.password
          })
        });

          //redirect to home page
          this.navCtrl.navigateRoot("login");
      } catch(e){
        this.showToast(e);
      }

      //dismiss loader
      (await loader).dismiss();

    }
  }

  formValidation(){
    if(!this.user.email){
      this.showToast("Enter email");
      return false;
    }
    if(!this.user.password){
      this.showToast("Enter password");
      return false;
    }
    if(!this.user.no_tel){
      this.showToast("Enter Phone Number");
      return false;
    }
    if(!this.user.name){
      this.showToast("Enter name");
      return false;
    }
    return true;
  }

  showToast (message:string){
    this.toastCtrl.create({
      message: message,
      duration: 3000
    }).then(toastData => toastData.present());
   }

}