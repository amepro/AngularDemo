import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {Friend} from '../services/friend';
import {RestApiService} from '../services/rest-api.service';
import {Classe} from '../services/classe';


// export class Friend {
//   constructor(
//     public id: number,
//     public firstname: string,
//     public lastname: string,
//     public department: string,
//     public email: string,
//     public country: string
//   ) {
//   }
// }


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() public m;
  classes: Classe[];
  friends: Friend[];
  closeResult: string;
  editForm: FormGroup;
  private deleteId: number;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private restapi: RestApiService) { }

  ngOnInit(): void {
    this.getClasses();
    this.getFriends();
    this.editForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      department: [''],
      email: [''],
      country: [''],
      classe: {id: '', libelle: ''}
      });
  }

  // getFriends(){
  //   this.httpClient.get<any>('http://localhost:8081/friends').subscribe(
  //     response => {
  //       console.log(response);
  //       this.friends = response;
  //     }
  //   );
  // }

  getFriends(){
    this.restapi.getFriend().subscribe((data: any) => {
      console.log(data);
      this.friends = data;
    });
  }

  getClasses(){
    this.restapi.getClasse().subscribe((data: any) => {
      console.log(data);
      this.classes = data;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // onSubmit(f: NgForm) {
  //   const url = 'http://localhost:8081/friends/addnew';
  //   this.httpClient.post(url, f.value)
  //     .subscribe((result) => {
  //       this.ngOnInit();
  //     });
  //   this.modalService.dismissAll();
  // }

  onSubmit(f: NgForm) {
    this.restapi.createFriend(f.value)
      .subscribe((result) => {
        this.ngOnInit();
      });
    this.modalService.dismissAll();
  }

  openDetails(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('fname').setAttribute('value', friend.firstname);
    document.getElementById('lname').setAttribute('value', friend.lastname);
    document.getElementById('dept').setAttribute('value', friend.department);
    document.getElementById('email2').setAttribute('value', friend.email);
    document.getElementById('cntry').setAttribute('value', friend.country);
  }


  openEdit(targetModal, friend: Friend) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue( {
      id: friend.id,
      firstname: friend.firstname,
      lastname: friend.lastname,
      department: friend.department,
      email: friend.email,
      country: friend.country
    });
  }

  // onSave() {
  //   const editURL = 'http://localhost:8081/friends/' + this.editForm.value.id + '/edit';
  //   console.log(this.editForm.value);
  //   this.httpClient.put(editURL, this.editForm.value)
  //     .subscribe((results) => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();
  //     });
  // }

  onSave() {
    console.log(this.editForm.value);
    this.restapi.updateFriend(this.editForm.value.id, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }


  openDelete(targetModal, friend: Friend) {
    this.deleteId = friend.id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  // onDelete() {
  //   const deleteURL = 'http://localhost:8081/friends/' + this.deleteId + '/delete';
  //   this.httpClient.delete(deleteURL)
  //     .subscribe((results) => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();
  //     });
  // }

  onDelete() {
    // const deleteURL = 'http://localhost:8081/friends/' + this.deleteId + '/delete';
    this.restapi.deleteFriend(this.deleteId)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }





}
