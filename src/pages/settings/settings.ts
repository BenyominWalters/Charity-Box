import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqliteProvider: SqliteProvider) {
      this.loadSettings();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  loadSettings() {
    this.sqliteProvider.loadSettings();
  }
  updateSettings() {
    this.sqliteProvider.updateSettings();
  }

}
