import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {

  private charityEmail: string = this.sqliteProvider.settingsData.charityEmail
  private charityName: string = this.sqliteProvider.settingsData.charityName
  private donationAmount: any;
  private browser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser,
    public sqliteProvider: SqliteProvider){
      this.donationAmount = this.sqliteProvider.boxTotal.replace('.', '%2e')
      this.browser = this.iab.create('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business='+this.charityEmail+'&lc=US&item_name=Donation+to+'+this.charityName+'&no_note=0&cn=&amount='+this.donationAmount+'&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted');
    }

    makePayment() {
      //Sends payment to custom charity URL
      console.log(this.browser);
      this.browser;
      /*.then(() => {
          //add toast of success???
            this.navCtrl.popToRoot();
      },*/
    }

}
