import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {StoreModule} from '@ngrx/store';

import {MainRoutingModule} from './main-routing.module';
import {MainPageComponent} from './main-page/main-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {TreeElemComponent} from './main-page/tree-block/tree-elem/tree-elem.component';
import {AddHostModalElemComponent} from './modals/add-host-modal-elem/add-host-modal-elem.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DraNavbarComponent} from './main-page/dra-navbar/dra-navbar.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DisplaySettingsComponent} from './modals/display-settings/display-settings.component';
import {ChangeValueComponent} from './modals/change-value/change-value.component';
import {ApproveComponent} from './modals/approve/approve.component';
import {buttonsReducer} from './redux/menu/buttons.reducer';
import {currentTabsReducer} from './redux/currentTab/currentTabs.reducer';
import {tabsReducer} from './redux/tabs/tabs.reducer';
import {hostReducer} from './redux/bookmarks/host.reducer';
import {treeReducer} from './redux/zktrees/zktree.reducer';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {TxtFileModalComponent} from './modals/txt-file-modal/txt-file-modal.component';
import {copyPastReducer} from './redux/copy-past/copy-past.reducer';
import {CopyPastModalComponent} from './modals/copy-past-modal/copy-past-modal.component';
import {SimpleTreeComponent} from './modals/copy-past-modal/simple-tree/simple-tree.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {compareReducer} from './redux/compare/compare.reducer';


@NgModule({
  declarations: [
    MainPageComponent,
    TreeElemComponent,
    AddHostModalElemComponent,
    DraNavbarComponent,
    DisplaySettingsComponent,
    ChangeValueComponent,
    ApproveComponent,
    TxtFileModalComponent,
    CopyPastModalComponent,
    SimpleTreeComponent
  ],
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
    MatMenuModule,
    DragDropModule,
    MatCheckboxModule,
    StoreModule.forRoot({
      buttons: buttonsReducer,
      currentTab: currentTabsReducer,
      tabs: tabsReducer,
      hosts: hostReducer,
      trees: treeReducer,
      copyPast: copyPastReducer,
      compare: compareReducer
    }),
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
  ]
})
export class MainModule {
}
