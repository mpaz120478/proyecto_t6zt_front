import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CrudCargoComponent } from './components/crud-cargo/crud-cargo.component';
import { CrudClienteComponent } from './components/crud-cliente/crud-cliente.component';
import { CrudEmpleadoComponent } from './components/crud-empleado/crud-empleado.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudCargoComponent,
    CrudClienteComponent,
    CrudEmpleadoComponent,
    CrudUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
