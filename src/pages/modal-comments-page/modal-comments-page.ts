import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-modal-comments-page',
  templateUrl: 'modal-comments-page.html',
})
export class ModalCommentsPage {

  comments: any = [];
  post_id: any;
  loading: any;

  carregando: boolean = true;
  backButton: any;
  user: any;
  commentUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private postsService: PostsService,
    public loadingCtrl: LoadingController, private alertCtrl: AlertController, private platform: Platform, private nativeStorage: NativeStorage) {
    this.post_id = navParams.get('post_id');
    this.getComentarios();

    nativeStorage.getItem('user').then(data => {
      this.user = data;
    }, error => {
      console.log(error);
    });
  }

  ionViewWillEnter() {
    this.backButton = this.platform.registerBackButtonAction(() => {
      this.fecharModal();
    });
  }

  doRefresh(refresher) {
    this.postsService.getComentarios(this.post_id).then((data: any) => {
      this.comments = data.comments;
      refresher.complete();
    }, error => {
      this.showAlert('Ops', 'Não foi possível carregar os comentários');
      refresher.complete();
    });

  }

  enviarComentario() {
    if (this.commentUser == '' || this.commentUser == undefined) {
      this.showAlert('Ops', 'Necessário escrever um comentário para poder enviar')
    } else {
      this.showLoading('Enviando comentário');

      let comentario = {
        user_id: this.user._id,
        _id: this.post_id,
        name: this.user.name,
        message: this.commentUser
      }

      this.postsService.comentar(comentario).then(data => {
        this.dismissLoading();
        this.getComentarios();
      }, error => {
        this.dismissLoading();
        this.showAlert('Erro', 'Não foi possível enviar seu comentário');
      });
    }
  }

  getComentarios() {
    this.carregando = true;
    this.postsService.getComentarios(this.post_id).then((data: any) => {
      this.comments = data.comments;
      this.carregando = false;
    }, error => {
      this.showAlert('Ops', 'Não foi possível carregar os comentários');
      this.fecharModal();
    });
  }


  fecharModal() {
    this.viewCtrl.dismiss();
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
