import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController,App } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserService } from '../../providers/user-service';
import { LoginPage } from '../loginpage/loginpage';

@Component({
  selector: 'page-perfil-page',
  templateUrl: 'perfil-page.html',
})
export class PerfilPage {

  user: any = {};
  nomeTemp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService,
    private nativeStorage: NativeStorage, public loadingCtrl: LoadingController, private toastCtrl: ToastController, 
    private alertCtrl: AlertController,private app: App) {

    this.nativeStorage.getItem('user')
      .then(data => {
        this.user = data;
        this.nomeTemp = this.user.name;
      });
  }

  getPerfil(_id) {
    this.userService.getPerfil(_id).then(data => {
      this.user = data;
      this.nomeTemp = this.user.name;
    });
  }

  logout(){
    this.nativeStorage.clear().then(data=>{
      this.app.getRootNav().push(LoginPage);
    })
  }

  alterar() {
    if (this.user.email == '' || this.user.name == '') {
      this.showToast("Preencha todos os campos");
    } else {
      let loading = this.loadingCtrl.create({
        content: "Salvando"
      });

      loading.present();
      this.userService.alterar(this.user).then(data => {
        this.showToast('Alterado com sucesso');
        this.nativeStorage.setItem('user', data);        
        loading.dismiss();
      }, error => {
        loading.dismiss();
        this.showAlert('Ops', 'Algo deu errado e não foi possível alterar seus dados, por favor tente novamente mais tarde');
      });
    }
  }

  validarAlterarSenha() {
    let alert = this.alertCtrl.create({
      title: 'Trocar Senha',
      message: 'Preencha os campos para trocar sua senha',
      inputs: [
        {
          name: 'password',
          placeholder: 'Nova senha',
          type: 'password'
        },
        {
          name: 'confirmPassword',
          placeholder: 'Confirme a nova senha',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirmar',
          handler: (data: any) => {
            if (data.password == data.confirmPassword) {
              this.alterarSenha(data.password);
            } else {
              this.showToast('As senhas não conferem');
            }
          }
        }
      ]
    });

    alert.present();
  }

  alterarSenha(senha) {
    let userSenha = {
      _id: this.user._id,
      password: senha
    };

    let loading = this.loadingCtrl.create({
      content: "Alterando senha"
    });

    loading.present();
    this.userService.alterarSenha(userSenha).then(data => {
      this.nativeStorage.setItem('user', data);      
      loading.dismiss();
      this.showToast('Senha alterada com sucesso');      
    }, error => {
      loading.dismiss();
      this.showAlert('Ops', 'Ocorreu um problema ao tentar alterar sua senha, tente novamente');
    });
  }


  showToast(content) {
    let toast = this.toastCtrl.create({
      message: content,
      duration: 2000
    });

    toast.present();
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
