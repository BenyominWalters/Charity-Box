import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {

  payment: PayPalPayment = new PayPalPayment('18.00', 'USD', 'Charity Box App', 'donation');
  currencies = ['USD', 'EUR'];
  payPalEnvironment: any = 'payPalEnvironmentSandbox';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private payPal: PayPal){ }

    makePayment() {
      this.payPal.init({
        PayPalEnvironmentProduction: '',//Config.payPalEnvironmentProduction,
        PayPalEnvironmentSandbox: 'AUpMzAvJALBYignhIO-URNCLuzJB6njMX6Z0dcvcGVNZdomAwjicEjhjssLkwK-tLfeg9pMNq9TrpODk' //Or use: Config.payPalEnvironmentSandbox
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
            alert(`Successfully paid. Status = ${response.response.state}`);
            console.log(response);
            this.navCtrl.popToRoot();

            // Example sandbox response
            //
            // {
            //   "client": {
            //     "environment": "sandbox",
            //     "product_name": "PayPal iOS SDK",
            //     "paypal_sdk_version": "2.16.0",
            //     "platform": "iOS"
            //   },
            //   "response_type": "payment",
            //   "response": {
            //     "id": "PAY-1AB23456CD789012EF34GHIJ",
            //     "state": "approved",
            //     "create_time": "2016-10-03T13:33:33Z",
            //     "intent": "sale"
            //   }
            // }
          }, () => {
            // Error or render dialog closed without being successful
            console.error('Error or render dialog closed without being successful');
          });
        }, () => {
          // Error in configuration
          console.error('Error in configuration');
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
        console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
      });

  }

}
