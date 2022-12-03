import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-categoria',
  templateUrl: './crud-categoria.component.html',
  styleUrls: ['./crud-categoria.component.css']
})
export class CrudCategoriaComponent implements OnInit {

  categorias: Categoria [] = []
  categoria: Categoria = {
    idCategoria:0,
    nomCategoria:"",
  }

  submitted = false;

  formsRegistraCategoria = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
  });

  formsActualizaCategoria = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,30}')]),
  });

  constructor(private categoriaService: CategoriaService, private utilService: UtilService) {
    this.utilService.listarCategorias().subscribe(
    response => this.categorias = response
    );
  }

  busca(obj:Categoria){
    this.categoria = obj;
    this.utilService.listarCategorias().subscribe(
      response =>  this.categorias = response
    );
  }

  registraCategoria(){
    this.submitted = true;
    if(this.formsRegistraCategoria.invalid){return;}
    this.submitted = false;
    this.categoriaService.registrarCategoria(this.categoria).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.utilService.listarCategorias().subscribe(
          x => this.categorias = x
        );
      }
    );
      this.categoria = {
        idCategoria:0,
        nomCategoria:"",
      }
  }

  actualizaCategoria(){
    this.submitted = true;
    if(this.formsRegistraCategoria.invalid){return;}
    this.submitted = false;
    this.categoriaService.actualizarCategoria(this.categoria).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.utilService.listarCategorias().subscribe(
          x => this.categorias = x
        );
      }
    );
      this.categoria = {
        idCategoria:0,
        nomCategoria:"",
      }
  }

  ngOnInit(): void {
  }

}
