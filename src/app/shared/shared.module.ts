import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        MomentModule
    ],
    exports: [ HttpClientModule, MomentModule],
    providers: [],
})
export class SharedModule {}
