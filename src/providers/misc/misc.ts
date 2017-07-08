import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'

/*
  Generated class for the MiscProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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
