import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class ErrorSuggestFixService {

  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.ai.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  }

  async EvaluateError(error: string): Promise<string> {
    try {
      const result = await this.model.generateContent(`${environment.ai.promptToFixErrors}${error}`);
      return result.response.text();
    } catch (error) {
      console.error('El solucionador de errores tuvo un error:', error);
      return 'Error al procesar la solicitud.';
    }
  }
}
