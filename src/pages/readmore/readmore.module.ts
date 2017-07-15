import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Readmore } from './readmore';
// import { ElasticHeaderDirective } from '../../directives/elastic-header/elastic-header';
import { ElasticHeaderDirectiveModule } from '../../directives/elastic-header/elastic-header.module';
@NgModule({
  declarations: [
    Readmore
  ],
  imports: [
    ElasticHeaderDirectiveModule,
    IonicPageModule.forChild(Readmore),
  ],
  exports: [
    Readmore
  ]
})
export class ReadmoreModule {}
