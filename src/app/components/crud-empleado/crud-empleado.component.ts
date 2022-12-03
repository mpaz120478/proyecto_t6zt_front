import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cargo } from 'src/app/models/cargo.model';
import { Empleado } from 'src/app/models/empleado.model';
import { Roles } from 'src/app/models/roles.model';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-empleado',
  templateUrl: './crud-empleado.component.html',
  styleUrls: ['./crud-empleado.component.css']
})

export class CrudEmpleadoComponent implements OnInit {

  empleados: Empleado [] = []
  cargos: Cargo [] = [];
  roles: Roles [] = [];
  filtro: string ="";

  empleado: Empleado = {
    idEmpleado:0,
    dniEmpleado:"",
    apeEmpleado:"",
    nomEmpleado:"",
    emailEmpleado:"",
    telefono:"",
    fechaContrato: new Date(),
    sueldoEmpleado:"",
    estado:1,
    cargo: {
      idCargo:-1,
    },
    rol: {
      idRol:-1,
    }
  }

  submitted = false;

  formsRegistraEmpleado = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
    validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validaFecha: new FormControl('',[Validators.required]),
    validaSueldo: new FormControl('', [Validators.required]),
    validaCargo: new FormControl('', [Validators.min(1)]),
    validaRol: new FormControl('', [Validators.min(1)]),
  });

  formsActualizaEmpleado = new FormGroup({
    validaDni: new FormControl('', [Validators.required,Validators.pattern('[0-9]{8}')]),
    validaApellido: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
    validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validaFecha: new FormControl('',[Validators.required]),
    validaSueldo: new FormControl('', [Validators.required]),
    validaCargo: new FormControl('', [Validators.min(1)]),
    validaRol: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  constructor(private empleadoService: EmpleadoService, private utilService: UtilService) {
    this.utilService.listarCargos().subscribe(
      response => this.cargos = response
    );
    this.utilService.listarRoles().subscribe(
      response =>this.roles = response
    );
    this.utilService.listarEmpleados().subscribe(
      response =>this.empleados = response
    );
   }

   actualizaEstado(obj:Empleado){
    obj.estado = obj.estado == 1? 0 : 1;
    this.empleadoService.actualizarEmpleado(obj).subscribe();
  }

  busca(obj:Empleado){
    this.empleado = obj;
    this.utilService.listarCargos().subscribe(
      response =>  this.cargos = response
    );
    this.utilService.listarRoles().subscribe(
      response =>  this.roles = response
    );
  }

  consultarApellido(){
    this.empleadoService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.empleados = x
    );
  }

  registraEmpleado(){
    this.submitted = true;
    if(this.formsRegistraEmpleado.invalid){return;}
    this.submitted = false;
    this.empleadoService.registrarEmpleado(this.empleado).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.empleadoService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.empleados = x
        );
      }
    );
    this.cargos = [];
    this.roles = [];
    this.empleado = {
      idEmpleado:0,
      dniEmpleado:"",
      apeEmpleado:"",
      nomEmpleado:"",
      emailEmpleado:"",
      telefono:"",
      fechaContrato: new Date(),
      sueldoEmpleado:"",
      estado:1,
      cargo: {
        idCargo:-1,
      },
      rol: {
      idRol:-1,
      }
    }
  }

  actualizaEmpleado(){
    this.submitted = true;
    if(this.formsRegistraEmpleado.invalid){return;}
    this.submitted = false;
    this.empleadoService.actualizarEmpleado(this.empleado).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.empleadoService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.empleados = x
        );
      }
    );
    this.cargos = [];
    this.roles = [];
    this.empleado = {
      idEmpleado:0,
      dniEmpleado:"",
      apeEmpleado:"",
      nomEmpleado:"",
      emailEmpleado:"",
      telefono:"",
      fechaContrato: new Date(),
      sueldoEmpleado:"",
      estado:1,
      cargo: {
        idCargo:-1,
      },
      rol: {
      idRol:-1,
      }
    }
  }

  eliminaEmpleado(obj:Empleado){
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
        this.empleadoService.eliminarEmpleado(obj.idEmpleado || 0).subscribe(
          x  =>  {
            Swal.fire('Mensaje',x.mensaje,'success');
            this.empleadoService.consultaPorApellidos(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.empleados = x
              );
            }
        );
      }
    })
  }

  ngOnInit(): void {
  }

}
