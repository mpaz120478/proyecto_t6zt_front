import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { Departamento } from 'src/app/models/departamento.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-cliente',
  templateUrl: './crud-cliente.component.html',
  styleUrls: ['./crud-cliente.component.css']
})
export class CrudClienteComponent implements OnInit {

  clientes: Cliente [] = []
  dptos: Departamento [] = []
  filtro: string =""

  cliente: Cliente = {
    IdCliente:0,
    DocCliente:0,
    DatosCliente:"",
    DirecCliente:"",
    FonoCliente:"",
    EmailCliente:"",
    Estado:1,
    dpto:{
      IdDpto:-1,
    }
  }

  submitted = false;

  formsRegistra = new FormGroup({
    validaDocumento: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
    validaDatos: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaDireccion: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,100}')]),
    validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
    validaDpto: new FormControl('', [Validators.min(1)]),
  });

  formsActualiza = new FormGroup({
    validaDocumento: new FormControl('', [Validators.required,Validators.pattern('[0-9]{11}')]),
    validaDatos: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ]{3,50}')]),
    validaDireccion: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9]{3,100}')]),
    validaTelefono: new FormControl('', [Validators.required,Validators.pattern('[0-9]{9}')]),
    validaCorreo: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
    validaDpto: new FormControl('', [Validators.min(1)]),
    validaEstado: new FormControl('', [Validators.min(0)]),
  });

  constructor(private clienteService: ClienteService, private utilService: UtilService) {
    this.utilService.listarDptos().subscribe(
      response => this.dptos = response
    );
  }

  actualizaEstado(obj:Cliente){
    obj.Estado = obj.Estado == 1? 0 : 1;
    this.clienteService.actualizarCliente(obj).subscribe();
  }

  busca(obj:Cliente){
    this.cliente = obj;
    this.utilService.listarDptos().subscribe(
      response =>  this.dptos = response
    );
  }

  consultarDatos(){
    this.clienteService.consultaPorDatos(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.clientes = x
    );
  }

  registraCliente(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.clienteService.registrarCliente(this.cliente).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.clienteService.consultaPorDatos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.clientes = x
        );
      }
    );
    this.dptos = [];
    this.cliente = {
      IdCliente:0,
      DocCliente:0,
      DatosCliente:"",
      DirecCliente:"",
      FonoCliente:"",
      EmailCliente:"",
      Estado:1,
      dpto:{
        IdDpto:-1,
      }
    }
  }

  actualizaCliente(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.clienteService.registrarCliente(this.cliente).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.clienteService.consultaPorDatos(this.filtro==""?"todos":this.filtro).subscribe(
          x => this.clientes = x
        );
      }
    );
    this.dptos = [];
    this.cliente = {
      IdCliente:0,
      DocCliente:0,
      DatosCliente:"",
      DirecCliente:"",
      FonoCliente:"",
      EmailCliente:"",
      Estado:1,
      dpto:{
        IdDpto:-1,
      }
    }
  }

  eliminaCliente(obj:Cliente){
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
        this.clienteService.eliminarCliente(obj.IdCliente || 0).subscribe(
          x  =>  {
            Swal.fire('Mensaje',x.mensaje,'success');
            this.clienteService.consultaPorDatos(this.filtro==""?"todos":this.filtro).subscribe(
              x => this.clientes = x
              );
            }
        );
      }
    })
  }

  ngOnInit(): void {
  }

}
