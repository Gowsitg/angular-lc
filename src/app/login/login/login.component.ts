import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    
   loginform:  FormGroup = new FormGroup({
    emailid: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
   public loaded: boolean = false;  
   public hidebtn: boolean = false;  
    constructor( private formBuilder: FormBuilder,private loginService: LoginService){}

    ngOnInit(): void {
        this.loginform = this.formBuilder.group ({
          emailid: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          password: ['', Validators.required],
          acceptTerms: ['', Validators.required],
          
        })
    }

    get fvalue() {
      return this.loginform.controls;
    }

    submit() {
     if(this.loginform.controls['emailid'].value && this.loginform.controls['password'].value) {
      this.loaded = true;
      this.loginService.login(this.loginform.value).subscribe(
        
        res => { 
          this.loaded = false;
            alert('Login Successfully');
        },
        error => {
          this.loaded = false;
          console.error('An error occurred:', error);
          alert('An error occurred. Please try again later.');
        }
      );  
     }
    }
}
