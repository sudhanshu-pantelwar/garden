import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IapdetailsPage } from './iapdetails';

@NgModule({
  declarations: [
    IapdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(IapdetailsPage),
  ],
  exports: [
    IapdetailsPage
  ]
})
export class IapdetailsPageModule {}
