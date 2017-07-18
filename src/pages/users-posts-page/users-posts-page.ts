import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service';
import { ModalCommentsPage } from '../modal-comments-page/modal-comments-page';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-users-posts-page',
  templateUrl: 'users-posts-page.html',
})
export class UsersPostsPage {

  posts: any = [];
  carregando: boolean = true;
  user: any = {};
  estaCarregado: boolean = false;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private postsService: PostsService, public modalCtrl: ModalController,
    private nativeStorage: NativeStorage, public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.nativeStorage.getItem('user')
      .then(data => {
        this.user = data;
    this.getPosts();
      });

    // this.user._id = '595a6376cb55a70f1db83c12';

  }

  ionViewWillEnter() {
    if (this.estaCarregado) {
      this.postsService.getPostsUsuario(this.user._id).then(data => {
        this.posts = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    }
  }

  getPosts() {
    this.carregando = true;
    this.postsService.getPostsUsuario(this.user._id).then(data => {
      this.posts = data;
      this.carregando = false;
      this.estaCarregado = true;
    }, error => {
      this.carregando = false;
    });
  }

  abrirComentarios(id) {
    let modal = this.modalCtrl.create(ModalCommentsPage, { post_id: id });
    modal.present();
  }

  excluirPost(post_id) {
    this.showLoading('Excluindo post');
    this.postsService.delete(post_id).then(data => {
      this.getPosts();
      this.dismissLoading();
    }, error => {
      console.log(error);
      this.dismissLoading();
      this.showAlert('Ops', 'Não foi possível excluir o seu post,tente novamente mais tarde');
    });
  }

  actions(post_id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modificar Post',
      buttons: [
        {
          icon: 'trash',
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluirPost(post_id);
          }
        },
        // {
        //   icon: 'share',
        //   text: 'Compartilhar',
        //   handler: () => {
        //     this.showAlert('Não implementado','Apenas demonstração');
        //   }
        // }, {
        //   icon: 'build',
        //   text: 'Alterar',
        //   handler: () => {
        //     this.showAlert('Não implementado','Apenas demonstração');
        //   }
        // }, 
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
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
