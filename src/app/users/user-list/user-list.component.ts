import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  list: User[];
  constructor(
    private service: UserService,
    private firestore: AngularFirestore,
    private toastr:ToastrService
    ) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id, 
          ...item.payload.doc.data() as User
        };
      })
    });
  }

  onEdit(emp: User) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('splixcubeprod1/' + id).delete();
      this.toastr.warning('User deleted successfully','');
    }
  }

}
