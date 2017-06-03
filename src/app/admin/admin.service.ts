import { Injectable, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class AdminService{    
    private postupdate:boolean = false;
    postUpdated(){                
        this.postupdate = true
    }
    closealert(){
        this.postupdate = false
    }
    getpostupdate(){
        return this.postupdate
    }    
}