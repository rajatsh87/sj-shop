import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableComponent } from './table/table.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

const routes: Routes = [ 
  {path:'',component:TableComponent},
  {path:'add',component:AddTransactionComponent},
  {path:'add/:id',component:AddTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
