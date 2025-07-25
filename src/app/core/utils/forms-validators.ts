import { FormGroup } from "@angular/forms";

export const isRequired = (field: 'name' | 'email' | 'password' | 'confirmPassword', form: FormGroup) => {
    const control = form.get(field);

    return control && control.touched && control.hasError('required')
}

export const hasEmailError = (form: FormGroup) => {
    const control = form.get('email');

    return control && control.touched && control.hasError('email');
}

export const confirmedPassword = (form: FormGroup) => {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value;
}

export const validateMinLenght = (form: FormGroup) => {
    const control = form.get('password');

    return control && control.touched && control.hasError('minlength');
}