import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FirebaseService } from './firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpUser } from './http-user.model';
import { Subject, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css'],
})
export class HttpComponent implements OnInit, OnDestroy {
  constructor(private httpService: FirebaseService) {}

  @Output() changes = new EventEmitter<void>();

  id: string = '';
  error = new Subject<HttpErrorResponse>();
  errorMessage = '';
  private onSub: Subscription = new Subscription();

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(0, [
      Validators.required,
      Validators.min(18),
      Validators.max(90),
    ]),
  });

  ngOnInit(): void {
    this.onCancel();
    this.httpService.currentUser.subscribe((user) => {
      this.userForm.setValue({
        name: user.name,
        mail: user.mail,
        age: user.age,
      });
      if (user.remoteId) {
        this.id = user.remoteId;
      }
    });
    this.onSub = this.error.subscribe((error) => {
      console.log(error.message);
      this.errorMessage = error.message;
    });
  }

  onCancel() {
    this.id = '';
    this.userForm.reset();
  }

  onSubmit() {
    let user: HttpUser = {
      name: this.userForm.controls['name'].value,
      mail: this.userForm.controls['mail'].value,
      age: this.userForm.controls['age'].value,
    };
    this.id === '' ? this.onPost(user) : this.onPut(user);
    this.onCancel();
  }

  onDelete() {
    this.httpService.delete(this.id).subscribe((answer) => this.changes.emit());
    this.onCancel();
  }

  onPatch(field: string) {
    let body = {
      [field]: this.userForm.get(field)?.value,
    };
    if (this.userForm.get(field)?.dirty) {
      this.httpService
        .patch(body, this.id)
        .subscribe((answer) => this.changes.emit());
    }

    this.onCancel();
  }

  onPutWithoutType(user: HttpUser) {
    if (this.userForm.dirty) {
      this.httpService.putWithoutType(user, this.id).subscribe((answer) => {
        this.changes.emit();
      });
    }
  }

  onPut(user: HttpUser) {
    if (this.userForm.dirty) {
      this.httpService.put(user, this.id).subscribe((answer) => {
        this.changes.emit();
      });
    }
  }

  onPost(user: HttpUser) {
    this.httpService.post(user).subscribe({
      next: (answer) => {
        console.log(answer);
        return this.changes.emit();
      },
      error: (webError) => {
        console.log(webError);
        this.error.next(webError);
      },
    });
  }

  onCustomPostResponse() {
    this.httpService
      .customPostResponse({
        name: 'TestResponse',
        mail: 'response@test',
        age: 22,
      })
      .subscribe();
  }

  onCustomPostBody() {
    this.httpService
      .customPostBody({
        name: 'TestBody',
        mail: 'body@test',
        age: 33,
      })
      .subscribe();
  }

  onCustomPostEvents() {
    this.httpService
      .customPostEvents({
        name: 'TestEvents',
        mail: 'events@test',
        age: 44,
      })
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onSub.unsubscribe();
  }
}
