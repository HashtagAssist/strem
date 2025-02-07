import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template:  `
     <div class="space-y-2 relative">
      <label 
        *ngIf="label"
        [for]="id" 
        class="block text-sm font-medium text-dark-300"
      >
        {{ label }}
      </label>
      <div class="relative">
        <ng-content select="[prefix]"></ng-content>
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readOnly]="readonly"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          class="flex h-10 w-full rounded-md border border-dark-600 bg-dark-700 px-10 py-2 text-sm
                  text-white placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500
                  disabled:cursor-not-allowed disabled:opacity-50"
          [class.border-red-500]="error"
          [class.focus:ring-red-500]="error"
        />
      </div>
      <p *ngIf="error" class="text-sm text-red-500">{{ error }}</p>
    </div>
    `
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() readonly: boolean = false;

  value: string = '';
  disabled: boolean = false;
  
  onChange = (_: any) => {};
  onTouched = () => {};

  onInputChange(event: Event): void {
    console.log(Event)

    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}