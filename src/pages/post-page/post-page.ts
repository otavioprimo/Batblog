import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { PostsService } from '../../providers/posts-service';

@Component({
  selector: 'page-post-page',
  templateUrl: 'post-page.html',
})
export class PostPage {

  user: any = {};
  title: any;
  content: any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage,
    private postsService: PostsService, public loadingCtrl: LoadingController, private alertCtrl: AlertController, ) {
      // this.user._id = '5958655bc200641fa0147886';
      // this.user.name = 'Otavio Augusto Primo'
    nativeStorage.getItem('user').then(data => {
      this.user = data;
    }, error => {
      console.log(error);
    });
  }

  publicar() {
    if (this.title == '' || this.title == undefined || this.content == '' || this.content == undefined) {
      this.showAlert('Campos em branco','Preencha todos os campos criar um novo post');
    }else{
      this.showLoading('Publicando');

      let post = {
        user_id: this.user._id,
        author: this.user.name,
        title: this.title,
        content: this.content
      };

      this.postsService.novoPost(post).then(data=>{
        this.dismissLoading();
        this.content = '';
        this.title = '';
        this.showAlert('Sucesso','Post Publicado');
      },error=>{
        this.dismissLoading();
        this.showAlert('Ops','Ocorreu algum erro ao tentar publicar seu post');
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

  showLoading(content: string) {
    this.loading = this.loadingCtrl.create({
      content: content
    });

    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismiss();
  }



}
