import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-form',
  imports: [],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export default class PostFormComponent {

  // Se recibe por url en caso de edicion
  idPost = input.required<string>();

}
