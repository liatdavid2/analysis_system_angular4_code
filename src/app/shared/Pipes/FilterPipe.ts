import { Pipe, PipeTransform } from '@angular/core';  
import { Session } from '../classes/Session';

  
@Pipe({  
    name: 'filter',  
    pure: false  
})  
  
export class FilterPipe implements PipeTransform {  
    transform(items: any[], field : string, value : string): any[] {  
        if (!items) return [];
        if (!value || value.length == 0) return items;
        return items.filter(it => 
        it[field].toLowerCase().indexOf(value.toLowerCase()) !=-1);
      }

   /* transform(items: any[], filter: Session): any {  
        //console.log(items)
        if (!items || !filter) {  
            return items;  
        }  
        return items.filter(item => {
            
           // item.indexOf(filter.CLUSTER_NAME) !== -1
           // console.log(item)
           return item.CLUSTER_NAME===filter.CLUSTER_NAME;
        });  
    }*/  
}  