import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData: User;

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('splixcubeprod1').snapshotChanges();
  }

}
