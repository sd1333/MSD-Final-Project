import { NgModule } from '@angular/core'

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTableModule } from '@angular/material/table'
import { MatRadioModule } from '@angular/material/radio'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [],
    imports: [MatButtonModule, MatFormFieldModule, MatToolbarModule, MatRadioModule, MatTableModule, MatInputModule],
    exports: [MatButtonModule, MatFormFieldModule, MatToolbarModule, MatRadioModule, MatTableModule, MatInputModule]
})

export class MaterialModule { }
