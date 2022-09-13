import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string){
    switch (code) {

      // El correo ya existe
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      // Contraseña debil
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';
      // Correo Invalido
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo Invalido';
      // Correo no existe
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'No existe ningún registro de usuario que corresponda al email proporcionado.';
      // Contraseña incorrecta
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'Contraseña incorrecta';
      default:
        return 'Error desconocido';
    }
  }

}
