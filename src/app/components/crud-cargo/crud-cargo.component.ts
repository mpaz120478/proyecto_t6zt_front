import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cargo } from 'src/app/models/cargo.model';
import { CargoService } from 'src/app/services/cargo.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-cargo',
  templateUrl: './crud-cargo.component.html',
  styleUrls: ['./crud-cargo.component.css']
})

export class CrudCargoComponent implements OnInit {

  cargos: Cargo [] = []
  cargo: Cargo = {
    IdCargo:0,
    NombreCargo:"",
  }

  submitted = false;

  formsRegistra = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
  });

  formsActualiza = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
  });

  constructor(private cargoService: CargoService, private utilService: UtilService) {
    this.utilService.listarCargos().subscribe(
      response => this.cargos = response
    );
   }

   busca(obj:Cargo){
    this.cargo = obj;
    this.utilService.listarCargos().subscribe(
      response =>  this.cargos = response
    );
  }

  registraCargo(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.cargoService.registrarCargo(this.cargo).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
      });
      this.cargo = {
        IdCargo:0,
        NombreCargo:"",
      }
  }

  actualizaCargo(){
    this.submitted = true;
    if(this.formsRegistra.invalid){return;}
    this.submitted = false;
    this.cargoService.actualizarCargo(this.cargo).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
      });
      this.cargo = {
        IdCargo:0,
        NombreCargo:"",
      }
  }

  eliminaCargo(obj:Cargo){
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
        this.cargoService.eliminarCargo(obj.IdCargo || 0).subscribe(
          x  =>  {
            Swal.fire('Mensaje',x.mensaje,'success');

            }
        );
      }
    })
  }

  ngOnInit(): void {
  }

}
