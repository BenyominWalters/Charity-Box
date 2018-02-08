import { Component } from '@angular/core';

<<<<<<< HEAD
import { BoxPage } from '../box/box';
import { SettingsPage } from '../settings/settings';
import { HistoryPage } from '../history/history';
=======
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
>>>>>>> 4e7899057197c075ec7472db1a5ced8614e8c0af

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

<<<<<<< HEAD
  tab1Root = HistoryPage;
  tab2Root = BoxPage;
  tab3Root = SettingsPage;
=======
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
>>>>>>> 4e7899057197c075ec7472db1a5ced8614e8c0af

  constructor() {

  }
}
