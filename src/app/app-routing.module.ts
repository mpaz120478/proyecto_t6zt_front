import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCargoComponent } from './components/crud-cargo/crud-cargo.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudCategoriaComponent } from './components/crud-categoria/crud-categoria.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';

const routes: Routes = [
  {path:"crudCargo", component:CrudCargoComponent},
  {path:"crudCliente", component:CrudClienteComponent},
  {path:"crudEmpleado", component:CrudEmpleadoComponent},
  {path:"crudUsuario", component:CrudUsuarioComponent},
  {path:"crudCategoria", component:CrudCategoriaComponent},
  {path:"crudProducto", component:CrudProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
