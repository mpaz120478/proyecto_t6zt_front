import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  productos: Producto [] = []
  categorias: Categoria [] = [];
  filtro: string ="";

  producto: Producto = {
    idProducto:0,
    nomProducto:"",
    precioProducto:"",
    stockProducto:"",
    categoria: {
      idCategoria:-1,
    }
  }

  submitted = false;

  formsRegistraProducto = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,50}')]),
    validaPrecio: new FormControl('', [Validators.required]),
    validaCategoria: new FormControl('', [Validators.min(1)]),
    validaStock: new FormControl('', [Validators.required]),
  });

  formsActualizaProducto = new FormGroup({
    validaNombre: new FormControl('',[Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñ0-9 ]{3,50}')]),
    validaPrecio: new FormControl('', [Validators.required]),
    validaCategoria: new FormControl('', [Validators.min(1)]),
    validaStock: new FormControl('', [Validators.required]),
  });

  constructor(private productoService: ProductoService, private utilService: UtilService) {
    this.utilService.listarCategorias().subscribe(
      response => this.categorias = response
    );
    this.productoService.listarProductos().subscribe(
      response => this.productos = response
    );
  }

  busca(obj:Producto){
    this.producto = obj;
    this.utilService.listarCategorias().subscribe(
      response =>  this.categorias = response
    );
  }

  consultarProducto(){
    this.productoService.consultaPorNombre(this.filtro==""?"todos":this.filtro).subscribe(
      x => this.productos = x
    );
  }

  registraProducto(){
    this.submitted = true;
    if(this.formsRegistraProducto.invalid){return;}
    this.submitted = false;
    this.productoService.registrarProducto(this.producto).subscribe(
      x=>{
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.utilService.listarCategorias().subscribe(
          x => this.categorias = x
        );
        this.productoService.listarProductos().subscribe(
          response => this.productos = response
        );
      }
    );
    this.producto = {
      idProducto:0,
      nomProducto:"",
      precioProducto:"",
      stockProducto:"",
      categoria: {
        idCategoria:-1,
      }
    }
  }

  actualizaProducto(){
    this.submitted = true;
    if(this.formsRegistraProducto.invalid){return;}
    this.submitted = false;
    this.productoService.actualizarProducto(this.producto).subscribe(
      x=>{
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire('Mensaje', x.mensaje,'info');
        this.utilService.listarCategorias().subscribe(
          x => this.categorias = x
        );
      }
    );
    this.producto = {
      idProducto:0,
      nomProducto:"",
      precioProducto:"",
      stockProducto:"",
      categoria: {
        idCategoria:-1,
      }
    }
  }

  ngOnInit(): void {
  }

}
