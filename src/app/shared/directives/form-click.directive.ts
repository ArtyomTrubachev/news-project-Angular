import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appFormClick]'
})
export class FormClickDirective {

  constructor() { }

  @Output() clickForm = new EventEmitter<MouseEvent>();

  @HostListener('click', ['$event.target'])
  public onClick(event: MouseEvent): void {
    if (event['className'].indexOf('form__input')>= 0)
      this.clickForm.emit();
  }
}
