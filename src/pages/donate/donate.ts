import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { SettingsPage } from '../settings/settings';

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {

  private email: string = 'info@clhds.com'
  private charityName: string = 'Cheder Lubavitch'
  private amount: string = '&amount=18%2e00'
  private browser = this.iab.create('https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business='+this.email+'&lc=US&item_name=Donation+to+'+this.charityName+'&no_note=0&cn='+this.amount+'&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser){ }

    makePayment() {
      //Sends payment to custom charity URL
      this.browser;
      /*.then(() => {
          //add toast of success???
            this.navCtrl.popToRoot();
      },*/
    }

}
