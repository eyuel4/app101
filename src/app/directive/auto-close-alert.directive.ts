import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoCloseAlert]'
})
export class AutoCloseAlertDirective {

  constructor(el: ElementRef) {
    console.log(el);
  
    setTimeout(()=>{
      el.nativeElement.remove();
  }, 6000);
    //el.nativeElement.delay(3000).fadeOut("slow",() => {});
   }
   

}
