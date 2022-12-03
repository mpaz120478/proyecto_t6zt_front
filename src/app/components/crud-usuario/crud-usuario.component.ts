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
  filtro: string="";

  usuario: Usuario = {
    idUsuario:0,
    dniEmpleado:"",
    apeEmpleado:"",
    nomEmpleado:"",
    nomUsuario:"",
    claveUsuario:"",
    estado:1,
  }

  submitted = false;

  formsRegistraUsuario = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaUsuario: new FormControl('',[Validators.required]),
    validaClave: new FormControl('',[Validators.required]),
  });

  formsActualizaUsuario = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaUsuario: new FormControl('',[Validators.required]),
    validaClave: new FormControl('',[Validators.required]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });



  constructor(private usuarioService: UsuarioService, private utilService: UtilService) {
    this.utilService.listarUsuarios().subscribe(
      response => this.usuarios = response
    );
   }

   actualizaEstado(obj:Usuario){
    obj.estado = obj.estado == 1? 0 : 1;
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
    if(this.formsRegistraUsuario.invalid){return;}
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
      idUsuario:0,
      dniEmpleado:"",
      apeEmpleado:"",
      nomEmpleado:"",
      nomUsuario:"",
      claveUsuario:"",
      estado:1,
    }
  }

  actualizaUsuario(){
    this.submitted = true;
    if(this.formsRegistraUsuario.invalid){return;}
    this.submitted = false;
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.usuarioService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.usuarios = x
        );
      }
    );
    this.usuario = {
      idUsuario:0,
      dniEmpleado:"",
      apeEmpleado:"",
      nomEmpleado:"",
      nomUsuario:"",
      claveUsuario:"",
      estado:1,
    }
  }

  eliminaUsuario(obj:Usuario){
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(obj.idUsuario || 0).subscribe(
          x  =>  {
            Swal.fire('Mensaje',x.mensaje,'success');
            this.usuarioService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.usuarios = x
              );
            }
        );
      }
    })
  }

  ngOnInit(): void {
  }

}
