import { Component, inject, Input, Output, EventEmitter, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest, RegisterRequest } from '../../models/auth-model';

@Component({
  selector: 'app-auth-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm {
  private fb = inject(FormBuilder);
  userForm: FormGroup;

  mode = input<'login' | 'register'>('login');
  formSubmitted = output<any>();

  constructor() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    if (this.mode() === 'register') {
      this.userForm.addControl('name', this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[a-zA-Zא-ת ]+$')]));
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.formSubmitted.emit(formData);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
