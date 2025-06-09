import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class PostSuggestService {

  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.ai.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: environment.ai.models.gem15pro });
  }

  async improvePostTitle(title: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`${environment.ai.promptImproveTitle}${title}`);
      return result.response.text();
    } catch (error) {
      console.error(error);
      return 'Error al procesar la solicitud.';
    }
  }

  async generatePostByTitle(title: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`${environment.ai.promptPostBytitle}${title}`);
      return result.response.text();
    } catch (error) {
      console.error(error);
      return 'Error al procesar la solicitud.';
    }
  }
}
