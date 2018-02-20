import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ItemProvider } from './itemProvider';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  selectedItem: any;
  selectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public itemProvider: ItemProvider) {
    this.selectedIndex = navParams.get('index');
    this.selectedItem = itemProvider.items[this.selectedIndex];
  }
}
