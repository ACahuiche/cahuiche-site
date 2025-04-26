import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Component, inject } from '@angular/core';
import { isRequired } from '../../../core/utils/forms-validators';
import { AuthService } from '../../services/auth.service';
import { UserDataAccess } from '../../../models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _auth = inject(AuthService);
  private user: UserDataAccess = { email : '', password: ''};

  form = this._formBuilder.group({
    email: this._formBuilder.control('', Validators.required),
    password: this._formBuilder.control('', Validators.required)
  });

  isRequired(field: "email" | "password") {
    return isRequired(field, this.form);
  }

  async login(){
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      
      if(email && password) {
        this.user = {
          email: email,
          password: password
        }
  
        let response = await this._auth.signIn(this.user);

       if('isError' in response) {
          throw new Error(response.errorMessage);
       }
        
        toast.success('Usuario logueado correctamente');
        this._router.navigate(['/blog/dashboard']);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
}
