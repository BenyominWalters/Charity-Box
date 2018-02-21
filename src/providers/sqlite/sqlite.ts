import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class SqliteProvider {

    public gifts: any = []; //array of all data pulled from table
    public data = { id: "", type:"", amount: 0 };
    public historyTotal = 0;
    public donationTotal = 0;
    public boxTotal = 0;

  constructor(public sqlite: SQLite) {
    console.log('Hello SqliteProvider Provider');
    this.boxTotal = this.historyTotal - this.donationTotal;
  }

  load(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS account(id INTEGER NOT NULL PRIMARY KEY, type VARCHAR(16), amount FLOAT(32,2))', {});

        db.executeSql('SELECT * FROM account ORDER BY id DESC', {})
          .then(res => {
            this.gifts = [];
            for(var i=0; i<res.rows.length; i++) {
              this.gifts.push({id:res.rows.item(i).id,type:res.rows.item(i).type,amount:res.rows.item(i).amount})
            }
          })

      });
  }

  saveData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO account VALUES(NULL,"deposit",round(?,2))',[this.data.amount])
        .then(res => {
          this.data.amount = 0;
        });
        this.totals();
    });
  }

  totals() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
    db.executeSql('SELECT SUM(amount) AS deposits FROM account WHERE type="deposit"',{})
      .then(res => {
        if(res.rows.length > 0){
          console.log('Executed SQL for deposits');
          this.historyTotal = res.rows.item(0).deposits;
          console.log(res.rows.item(0).deposits + 'deposits');
        }
      })
      .catch(e => console.log(JSON.stringify(e) + 'totals failed!!!'));
    });
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
    db.executeSql('SELECT SUM(amount) AS donations FROM account WHERE type="donation"',{})
    .then(res => {
      if(res.rows.length > 0){
        console.log('Executed SQL for donations');
        this.donationTotal = res.rows.item(0).donations;
        console.log(res.rows.item(0).donations + 'donations');
      }
    })
    .catch(e => console.log(JSON.stringify(e) + 'donations failed!!!'));
  });
  this.boxTotal = this.historyTotal - this.donationTotal;
  }


  deleteData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM account WHERE id=?', [id])
      .then(res => {
        console.log(res);
        this.totals();
        this.load();
      })
      .catch(e => console.log(JSON.stringify(e) + 'delete failed!!!'));
    }).catch(e => console.log(e));
  }

  getCurrentData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM account WHERE id=?', [id])
      .then(res => {
        if(res.rows.length > 0) {
          this.data.id = res.rows.item(0).id;
          this.data.type = res.rows.item(0).type;
          this.data.amount = res.rows.item(0).amount;
        }
      })
    })
  }

  updateData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE account SET amount=? WHERE id=?', [this.data.amount,this.data.id])
      .then(res => {
      })
    })
  }

  donateBox() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO account VALUES(NULL,"donation",18.00)',{})
        .then(res => {
          this.data.amount = 0;
          console.log(res);
        })
        .catch(e => {
          console.log(JSON.stringify(e));
        });
        this.totals();
    }).catch(e => {
      console.log(JSON.stringify(e));
      });
  }

}
