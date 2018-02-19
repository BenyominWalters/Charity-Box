import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

@Injectable()
export class SqliteProvider {

    public gifts: any = []; //array of all data pulled from table
//  totalCharity: number = 0; //total put in charity box
//  totalDonated: number = 0; //total donated from charity box
//  boxValue: number = 0; //current amount in charity box
    public data = { id: "", type:"", amount: 0 };
    public total = 0;

  constructor(public sqlite: SQLite) {
    console.log('Hello SqliteProvider Provider');
  }

  load(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS account(id INTEGER NOT NULL PRIMARY KEY, type VARCHAR(16), amount FLOAT(32,2))', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(JSON.stringify(e) + '1111111111'));

        db.executeSql('SELECT * FROM account ORDER BY id DESC', {})
          .then(res => {
            this.gifts = [];
            for(var i=0; i<res.rows.length; i++) {
              this.gifts.push({id:res.rows.item(i).id,type:res.rows.item(i).type,amount:res.rows.item(i).amount})
            }
          })

      })
      .catch(e => console.log('222222222222'));
      console.log('Method')
  }

  saveData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO account VALUES(NULL,"deposit",round(?,2))',[this.data.amount])
        .then(res => {
          this.data.amount = 0;
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
        this.boxTotal();
    }).catch(e => {
      console.log(e);
      });
  }

  boxTotal() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) =>{
    db.executeSql('SELECT SUM(amount) AS Total FROM account', {})
      .then(res => {
        this.total = res.rows.item(0).Total;
      });
    });
  }

  deleteData(id) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM account WHERE id=?', [id])
      .then(res => {
        console.log(res);
        this.boxTotal();
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

}
