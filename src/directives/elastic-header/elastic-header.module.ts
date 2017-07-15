import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ElasticHeaderDirective } from './elastic-header';

@NgModule({
  declarations: [ElasticHeaderDirective],
  imports: [
    IonicPageModule.forChild(ElasticHeaderDirective),
  ],
  exports: [ElasticHeaderDirective],
})
export class ElasticHeaderDirectiveModule {}