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
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }

  async generatePostByTitle(title: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`${environment.ai.promptPostBytitle}${title}`);
      return result.response.text();
    } catch (error) {
      console.error('El generador de posts tuvo un error:', error);
      return 'Error al procesar la solicitud.';
    }
  }

  async improvePostTitle(title: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`${environment.ai.promptImproveTitle}${title}`);
      return result.response.text();
    } catch (error) {
      console.error('El mejorador de titulos tuvo un error:', error);
      return 'Error al procesar la solicitud.';
    }
  }
}
