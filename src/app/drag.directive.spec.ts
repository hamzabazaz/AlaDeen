import { DragDirective } from './drag.directive';
import { DomSanitizer, ɵDomSanitizerImpl } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DragDirective', () => {
  let directive: DragDirective;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DragDirective,
        { provide: DomSanitizer, useClass: ɵDomSanitizerImpl }  // Provide real or mock instance
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore unrecognized elements and attributes
    });
    // Instantiate directive and injector
    directive = TestBed.inject(DragDirective);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
