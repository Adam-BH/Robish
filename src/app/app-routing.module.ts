import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FeaturesComponent } from './features/features.component';
import { DeviceConnectedComponent } from './device-connected/device-connected.component';
import { DeviceNotConnectedComponent } from './device-not-connected/device-not-connected.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'features', component: FeaturesComponent},
  {path: 'devicec', component:DeviceConnectedComponent},
  {path:'devicenc',component:DeviceNotConnectedComponent},
  {path: 'order',component:OrderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
