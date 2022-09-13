import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarUsuario: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService,
    private router: Router, private firebaseError: FirebaseErrorService) {
      this.recuperarUsuario = this.fb.group({
        correo: ['', [Validators.required, Validators.email]]
      })
     }

  ngOnInit(): void {
  }

  recuperar(){
    const email = this.recuperarUsuario.value.correo;
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/login']);
      this.toastr.info('Se ha enviado un correo para restablecer su password', 'Recuperar Password')


    }).catch((error) => {
      this.loading = true;
      console.log(error);
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

}
