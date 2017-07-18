import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-cadastro-page',
  templateUrl: 'cadastro-page.html',
})
export class CadastroPage {

  name: any;
  email: any;
  password: any;
  confirmPassword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController, private nativeStorage: NativeStorage) {
  }

  validaCadastro() {
    if (this.password === this.confirmPassword) {
      this.cadastrar();
    } else {
      this.showAlert('Ops', 'As senhas devem ser iguais');
    }
  }

  cadastrar() {
    let loading = this.loadingCtrl.create({
      content: "Salvando"
    });

    loading.present();

    let user = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    this.userService.cadastrar(user).then((data: any) => {
      loading.dismiss();

      if (data.error)
        this.showAlert('Ops', data.error);
      else {
        this.nativeStorage.setItem('logado', true);
        this.nativeStorage.setItem('user', data).then(data => {
          this.navCtrl.setRoot(TabsPage);
        });
      }
    }, error => {
      console.log(error);
    });
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
