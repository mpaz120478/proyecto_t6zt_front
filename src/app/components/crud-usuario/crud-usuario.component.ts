import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})

export class CrudUsuarioComponent implements OnInit {

  usuarios: Usuario [] = []
  filtro: string=""

  usuario: Usuario = {
    IdUsuario:0,
    DniEmpleado:"",
    ApeEmpleado:"",
    NomEmpleado:"",
    NomUsuario:"",
    FechaRegistro: new Date,
    ClaveUsuario:"",
    Estado:1,
    empleado: {
      IdEmpleado:-1,
    }
  }

  submitted = false;

  formsRegistra = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaUsuario: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,20}')]),
    validaClave: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,20}')]),
  });

  formsActualiza = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaUsuario: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,20}')]),
    validaClave: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,20}')]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });



  constructor(private usuarioService: UsuarioService, private utilService: UtilService) {
    this.utilService.listarUsuarios().subscribe(
      response => this.usuarios = response
    );
   }

   actualizaEstado(obj:Usuario){
    obj.Estado = obj.Estado == 1? 0 : 1;
    this.usuarioService.actualizarUsuario(obj).subscribe();
  }

  busca(obj:Usuario){
    this.usuario = obj;
    this.utilService.listarUsuarios().subscribe(
      response =>  this.usuarios = response
    );
  }

  consultarApellido(){
    this.usuarioService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.usuarios = x
    );
  }

  registraUsuario(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.usuarioService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.usuarios = x
        );
      }
    );
    this.usuario = {
      IdUsuario:0,
      DniEmpleado:"",
      ApeEmpleado:"",
      NomEmpleado:"",
      NomUsuario:"",
      FechaRegistro: new Date,
      ClaveUsuario:"",
      Estado:1,
      empleado: {
        IdEmpleado:-1,
      }
    }
  }

  actualizaUsuario(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.usuarioService.registrarUsuario(this.usuario).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.usuarioService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.usuarios = x
        );
      }
    );
    this.usuario = {
      IdUsuario:0,
      DniEmpleado:"",
      ApeEmpleado:"",
      NomEmpleado:"",
      NomUsuario:"",
      FechaRegistro: new Date,
      ClaveUsuario:"",
      Estado:1,
      empleado: {
        IdEmpleado:-1,
      }
    }
  }

  ngOnInit(): void {
  }

}
