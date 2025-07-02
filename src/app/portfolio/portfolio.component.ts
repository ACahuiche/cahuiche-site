import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { toast } from 'ngx-sonner';
import { environment } from '../../environments/environment';
import { RecaptchaVerifier, Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-portfolio',
  imports: [RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export default class PortfolioComponent {
  private _auth = inject(Auth);
  private router = inject(Router);

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  goToCV() {
    window.open('https://www.self.so/alberto-manuel-cahuiche-castellanogzk2k5','_blank')
  }
  
  async onSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;

    try {
      const recaptchaVerifier = new RecaptchaVerifier(this._auth, 'recaptcha-container', {
        size: 'invisible'
      });

      await recaptchaVerifier.verify();

      emailjs.sendForm(environment.emailjs.serviceId, environment.emailjs.templateId, target, environment.emailjs.userId)
      .then(() => {
        toast.success('Mensaje enviado correctamente');
        target.reset();
      })
      .catch((error) => {
        toast.warning('Ups, algo salió mal, intenta de nuevo.');
        console.error(error);
      });
      
    } catch (error) {
      toast.warning('Ups, algo salió mal: ',error);
    }

    
  }
}
