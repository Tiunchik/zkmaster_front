import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {menuReducer} from './redux/menu/menu.reducer';
import {leftReducer} from './redux/tab/tab.reducer';

import {MainRoutingModule} from './main-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {TreeElemComponent} from './tree-block/tree-elem/tree-elem.component';
import {AddHostModalElemComponent} from './modals/add-host-modal-elem/add-host-modal-elem.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {DraNavbarComponent} from './drag-block/dra-navbar/dra-navbar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DivBlockComponent} from './drag-block/div-block/div-block.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DisplaySettingsComponent} from './modals/display-settings/display-settings.component';


@NgModule({
  declarations: [
    MainPageComponent,
    TreeElemComponent,
    AddHostModalElemComponent,
    DraNavbarComponent,
    DivBlockComponent,
    DisplaySettingsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTreeModule,
    DragDropModule,
    MatCheckboxModule,
    StoreModule.forRoot(
      {buttons: menuReducer, leftTabs: leftReducer}
    )
  ]
})
export class MainModule {
}
