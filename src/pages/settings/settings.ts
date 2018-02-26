import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public boxMinimuml: string = '&amount=18%2e00'
  public charityEmail: string = 'info@clhds.com'
  public charityName: string = 'Cheder Lubavitch'


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  udateSettings() {
    // set a key/value
  storage.set('boxMinimum', '');

  // Or to get a key/value pair
  storage.get('age').then((val) => {
    console.log('Your age is', val);
  });
  }

}
