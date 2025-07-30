
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Timestamp } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { isRequired, hasEmailError, confirmedPassword, validateMinLenght } from '../../../core/utils/forms-validators'
import { AuthService } from '../../services/auth.service';
import { UserDataAccess } from '../../../models/user.model';
import { ErrorLog } from '../../../models/error-log.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent{
  private _formBuilder = inject(FormBuilder);
  private _auth = inject(AuthService);
  private _router = inject(Router);
  private user: UserDataAccess = { email : '', password: '', name: '', isAdmin: false};


  form = this._formBuilder.group({
    name: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: this._formBuilder.control('', Validators.required)
  });

  errorLog: ErrorLog = {
    timestamp: Timestamp.now(),
    element: '',
    errorMessage: ''
  };

  isRequired(field: 'name' | 'email' | 'password' | 'confirmPassword') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  confirmedPassword() {
    return confirmedPassword(this.form);
  }

  validateMinLenght() {
    return validateMinLenght(this.form);
  }

  async register() {
    if (this.form.invalid) return;
  
    try {
      const { email, password, name } = this.form.value;
  
      if (email && password && name) {
        this.user = {
          email: email,
          password: password,
          name: name,
          isAdmin: false
        };
        await this._auth.signUp(this.user);
        toast.success('Usuario creado correctamente');
        this._router.navigate(['/blog/dashboard']);
      }

    } catch (error) {
      toast.error(error.errorMessage);
    }
  }
}
