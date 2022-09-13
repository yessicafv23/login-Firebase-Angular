import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then((user) => {
      console.log(user);
      if (user && user.emailVerified) {
        this.dataUser = user;
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

  // Cerrar Sesión
  logout(){
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    })

  }

}
