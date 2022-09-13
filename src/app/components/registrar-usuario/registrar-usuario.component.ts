import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})
export class RegistrarUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService,
    private router: Router, private firebaseError: FirebaseErrorService) {
    this.registrarUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  registrar() {
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;
    console.log(email, password, repetirPassword);
    //this.toastr.success('Se ha registrado exitosamente', 'Registro exitoso');

    // Validar si las contraseñas son distintas
    if (password !== repetirPassword) {
      this.toastr.error('La contraseñas ingresadas deben ser las mismas', 'Error');
      return;
    }
    this.loading = true;

    // Acceder a la instancia AngularFireAuth
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loading = false;
      this.verificarCorreo();
    }).catch((error) => {
      console.log(error);
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

  verificarCorreo() {
    this.afAuth.currentUser.then((user) => user?.sendEmailVerification())
      .then(() => {
        this.toastr.info('Le enviamos un correo electrónico para su verificación', 'Verificar Correo');
        this.router.navigate(['/login']);
      })
  }

}
