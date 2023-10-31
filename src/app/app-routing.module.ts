import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';
import { Page404Component } from './pages/page404/page404.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { authGuard } from './auth.guard';
import { connectedGuard } from './connected.guard';

const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [connectedGuard],
  },
  { path: 'product', component: ProductComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [connectedGuard] },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'update/:id',
    component: UpdateProductComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
