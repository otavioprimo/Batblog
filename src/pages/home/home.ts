import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { PostsService } from '../../providers/posts-service';
import { ModalCommentsPage } from '../modal-comments-page/modal-comments-page';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any = [];
  carregando: boolean = true;
  user_id: any;
  constructor(public navCtrl: NavController, private platform: Platform, private postsService: PostsService,
     public modalCtrl: ModalController,private nativeStorage: NativeStorage) {
    this.platform.ready().then(() => {
      this.getPosts();
      this.nativeStorage.getItem('user')
        .then((data:any) => {
          this.user_id = data._id;
        });
    });
  }

  doRefresh(refresher) {
    this.postsService.getAll().then(data => {
      this.posts = data;
      refresher.complete();
    }, error => {
      refresher.complete();
    });
  }

  getPosts() {
    this.carregando = true;
    this.postsService.getAll().then(data => {
      this.posts = data;
      this.carregando = false;
    }, error => {
      this.carregando = false;
    });
  }

  abrirComentarios(id) {
    let modal = this.modalCtrl.create(ModalCommentsPage, { post_id: id });
    modal.present();
  }

  giveLike(post_id) {
    console.log(this.user_id);
    let post_like = {
      _id: post_id,
      user_id: this.user_id
    };

    this.postsService.like(post_like)
      .then(data => {
        console.log(data);
      }, error => {
        console.log(error);
      })
  }


}
