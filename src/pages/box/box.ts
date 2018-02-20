import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';

import { SqliteProvider } from '../../providers/sqlite/sqlite';

@IonicPage()
@Component({
  selector: 'page-box',
  templateUrl: 'box.html',
})
export class BoxPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: Toast,
    public sqliteProvider: SqliteProvider){
    this.totals();
  }

    setInput(amt: number) {
      this.sqliteProvider.data.amount = amt + this.sqliteProvider.data.amount;
      }
    saveData(){
      if (this.sqliteProvider.data.amount > 0){
        this.sqliteProvider.saveData();
        this.toast.show('Added to Box!', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }else{
        this.toast.show('Please Add Value', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }

    resetBox() {
      this.sqliteProvider.data.amount = 0
    }

    totals() {
      this.sqliteProvider.totals();
    }

    donateBox() {
      if (this.sqliteProvider.boxTotal > 18){
        this.sqliteProvider.donateBox();
        this.toast.show('You Donated', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }else{
        this.toast.show(`Your Box Isn't Full`, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }

}
