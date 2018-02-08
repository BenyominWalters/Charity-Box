import { Component } from '@angular/core';

import { BoxPage } from '../box/box';
import { SettingsPage } from '../settings/settings';
import { HistoryPage } from '../history/history';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HistoryPage;
  tab2Root = BoxPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
