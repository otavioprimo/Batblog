import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {

  private baseUri;
  constructor(public http: Http) {
    // this.baseUri = 'http://localhost:3000/api/user'
    // this.baseUri = 'http://192.168.0.14:3000/api/user'
    this.baseUri = 'http://ec2-52-34-57-198.us-west-2.compute.amazonaws.com:9000/api/user'
  }


  login(usuario) {

    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.baseUri + '/login', JSON.stringify(usuario), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  cadastrar(usuario) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.baseUri, JSON.stringify(usuario), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  alterar(usuario) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put(this.baseUri, JSON.stringify(usuario), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  alterarSenha(usuario) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.put(this.baseUri + '/changepassword', JSON.stringify(usuario), { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getPerfil(_id) {
    return new Promise(resolve => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get(this.baseUri + '/perfil/' + _id, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

}
