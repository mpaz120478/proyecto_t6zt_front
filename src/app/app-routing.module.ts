import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudCargoComponent } from './components/crud-cargo/crud-cargo.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';

const routes: Routes = [
  {path:"crudCargo", component:CrudCargoComponent},
  {path:"crudCliente", component:CrudClienteComponent},
  {path:"crudEmpleado", component:CrudEmpleadoComponent},
  {path:"crudUsuario", component:CrudUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
