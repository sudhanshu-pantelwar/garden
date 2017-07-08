import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Readmore } from './readmore';

@NgModule({
  declarations: [
    Readmore,
  ],
  imports: [
    IonicPageModule.forChild(Readmore),
  ],
  exports: [
    Readmore
  ]
})
export class ReadmoreModule {}
