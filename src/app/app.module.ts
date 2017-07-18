import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/loginpage/loginpage';
import { CadastroPage } from '../pages/cadastro-page/cadastro-page';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { PostPage } from '../pages/post-page/post-page';
import { PerfilPage } from '../pages/perfil-page/perfil-page';
import { UsersPostsPage } from '../pages/users-posts-page/users-posts-page';
import { ModalCommentsPage } from '../pages/modal-comments-page/modal-comments-page';

import { UserService } from '../providers/user-service';
import { PostsService } from '../providers/posts-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    TabsPage, 
    PerfilPage,
    PostPage,
    UsersPostsPage,
    ModalCommentsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    TabsPage,
    PerfilPage,
    PostPage,
    UsersPostsPage,
    ModalCommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    UserService,
    PostsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
