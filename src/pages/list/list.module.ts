import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ItemDetailsPage } from "./item-details";
import { ItemProvider } from "./itemProvider";

@NgModule({
  declarations: [
    ListPage,
    ItemDetailsPage
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
  entryComponents: [
    ListPage,
    ItemDetailsPage
  ],
  providers: [
    ItemProvider
  ]
})
export class ListPageModule {}
