import { Pipe, PipeTransform } from "@angular/core";
 
/**
 * Filter for limiting string value
 */
@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
 
  transform(val: string, limit: number) {
    if (val != null && val.length > limit ){
      return val.substring(0, limit) + '...';
    } else {
      return val;
    }
  }
}