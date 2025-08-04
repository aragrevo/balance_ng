import { inject, Pipe, type PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string, ...args: unknown[]): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
