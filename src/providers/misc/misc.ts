import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'


@Injectable()
export class MiscProvider {
  loading: any;
  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello MiscProvider Provider');
  }

  startLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  closeLoading(){
    this.loading.dismiss();
  }

}
