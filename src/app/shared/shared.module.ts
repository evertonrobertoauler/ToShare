import { NgModule } from '@angular/core';
import { TruncatePipe} from '../pipes/truncate'; 
import { Ng2PaginationModule} from 'ng2-pagination';
import { MdlModule } from '@angular-mdl/core'; 

@NgModule({
  imports: [           
    Ng2PaginationModule,
    MdlModule,
  ],
  declarations: [ TruncatePipe  ],
  exports:[  TruncatePipe , Ng2PaginationModule , MdlModule ],  
})
export class SharedModule { }
