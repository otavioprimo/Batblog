import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PostsService {

  private baseUri;
  constructor(public http: Http) {
    // this.baseUri = 'http://localhost:3000/api/post'
    // this.baseUri = 'http://192.168.0.14:3000/api/post'
    this.baseUri = 'http://ec2-52-34-57-198.us-west-2.compute.amazonaws.com:9000/api/post'
  }

  getAll() {
    return new Promise(resolve => {

      this.http.get(this.baseUri)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getComentarios(post_id) {
    return new Promise(resolve => {

      this.http.get(this.baseUri + '/' + post_id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  comentar(comment) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.baseUri + '/comment', JSON.stringify(comment), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getPostsUsuario(user_id) {
    return new Promise(resolve => {

      this.http.get(this.baseUri + '/user/' + user_id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  delete(post_id) {
    return new Promise(resolve => {

      this.http.delete(this.baseUri + '/' + post_id)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  novoPost(post) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.baseUri, JSON.stringify(post), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  like(post_like){
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      this.http.post(this.baseUri + '/like', JSON.stringify(post_like), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }



}
