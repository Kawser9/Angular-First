import { Routes } from '@angular/router';
import { IndexComponent } from './pages/products/index/index.component';
import { CreateComponent } from './pages/products/create/create.component';
import { ViewComponent } from './pages/products/view/view.component';
import { EditComponent } from './pages/products/edit/edit.component';
import { CategoriesIndexComponent } from './pages/categories/categories-index/categories-index.component';
import { CategoriesCreateComponent } from './pages/categories/categories-create/categories-create.component';
import { ButtonsComponent } from './component/buttons/buttons.component';
import { ProductComponent } from './frontend/product/product.component';

export const routes: Routes = [
    {path:'products', redirectTo:'products/index', pathMatch:'full'},
    {path:'products/index', component:IndexComponent},
    {path:'products/create', component:CreateComponent},
    {path:'products/edit/:id', component:EditComponent},
    {path:'products/view/:productiId', component:ViewComponent},

    {path: 'categories', component:CategoriesIndexComponent},
    {path: 'categories/create', component:CategoriesCreateComponent},

    {path: 'buttons', component:ButtonsComponent},

    {path: 'frontend', component:ProductComponent}
];

export class AppRoutingModule {}
