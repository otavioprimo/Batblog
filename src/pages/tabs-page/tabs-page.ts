import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { PostPage } from '../post-page/post-page';
import { PerfilPage } from '../perfil-page/perfil-page';
import { HomePage } from '../home/home';
import { UsersPostsPage } from '../users-posts-page/users-posts-page';

declare var window;

@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html',
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = PostPage;
  tab3Root: any = UsersPostsPage;
  tab4Root: any = PerfilPage;
  backButton:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform) {
  }

  ionViewWillEnter() {
    this.backButton = this.platform.registerBackButtonAction(() => {
      window.plugins.appMinimize.minimize();
    });
  }

  ionViewCanLeave(): boolean {
    this.backButton();
    return true;
  }


}
