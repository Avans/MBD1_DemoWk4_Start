import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from './item-details';
import { ItemProvider } from './itemProvider';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemProvider: ItemProvider) {

    this.items = itemProvider.items;
  }

  itemTapped(event, index) {
    this.navCtrl.push(ItemDetailsPage, { index: index });
  }
}
