import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Platform } from '@ionic/angular';
import { LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  items: Observable<any[]>;
  age: string = '';
  newTodo: string = '';
  itemsRef: AngularFirestoreCollection;
  pet: string = "pet";
  isAndroid: boolean = false;
  selectedFile: any;
  loading: HTMLIonLoadingElement;
  showToast: any;
  posts: any;
  images: any;

  constructor(
    platform: Platform,
    private db: AngularFirestore, private storage: AngularFireStorage, private loadingController: LoadingController, 
    private loadingCtrl: LoadingController,
 private toastCtrl: ToastController,
 private firestore: AngularFirestore)
    {
    this.isAndroid = platform.is('android');
    this.itemsRef = db.collection('items')
    this.items = this.itemsRef.valueChanges();
  }
  
  chooseFile (event) {
    this.selectedFile = event.target.files
  }

  addTodo(){
    this.itemsRef.add({
      title: this.newTodo,
      age: this.age
    })
    .then(async resp => {

      const imageUrl = await this.uploadFile(resp.id, this.selectedFile)

      this.itemsRef.doc(resp.id).update({
        id: resp.id,
        imageUrl: imageUrl || null,
      })
    }).catch(error => {
      console.log(error);
    })
  }

  async uploadFile(id, file): Promise<any> {
    if(file && file.length) {
      try {
        const task = await this.storage.ref('images').child(id).put(file[0])
        this.loading.dismiss();
        return this.storage.ref(`images/${id}`).getDownloadURL().toPromise();
      } catch (error) {
        console.log(error);
      }
    }
  }

  remove(item){
    console.log(item);
    if(item.imageUrl) {
      this.storage.ref(`images/${item.id}`).delete()
    }
    this.itemsRef.doc(item.id).delete()
  }
}

    


