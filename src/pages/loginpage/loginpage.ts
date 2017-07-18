import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { CadastroPage } from '../cadastro-page/cadastro-page';
import { UserService } from '../../providers/user-service';
import { TabsPage } from '../tabs-page/tabs-page';
import { NativeStorage } from '@ionic-native/native-storage';

declare var window;

@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginPage {

  email: any;
  password: any;
  backButton: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage, private platform: Platform) {
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

  cadastrar() {
    this.navCtrl.push(CadastroPage);
  }

  login() {
    if (this.email == '' || this.email == undefined || this.password == '' || this.password == undefined)
      this.showAlert('Falha no login', 'Email e senha devem ser preenchidos')
    else {
      let loading = this.loadingCtrl.create({
        content: "Entrando"
      });

      loading.present();

      let user = {
        email: this.email,
        password: this.password
      };

      this.userService.login(user).then(data => {
        loading.dismiss();
        if (data != null) {
          this.nativeStorage.setItem('logado', true);
          this.nativeStorage.setItem('user', data).then(data => {
            this.navCtrl.setRoot(TabsPage);
          });
        } else {
          loading.dismiss();
          this.showAlert('Falha na autenticação', 'Email ou Senha inválidos');
        }
      }, error => {
        loading.dismiss();
        this.showAlert('Ops', 'Não foi possível se conectar com o servidor, por favor tente novamente');
      });
    }
  }

  showAlert(title, content) {
    let alert = this.alertCtrl.create({
      title: title,
      message: content,
      buttons: ['OK']
    });

    alert.present();
  }
}
