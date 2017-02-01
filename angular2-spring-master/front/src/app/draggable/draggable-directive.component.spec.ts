import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { DraggableModule } from '../ng2-draggable';

const html = ``;

describe('component:DraggableDirectiveComponent', () => {
  let fixture:ComponentFixture<any>;
  let context:TestNGDraggableDirectiveComponent;
  let element:any;
  let clean:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNGDraggableDirectiveComponent],
      //imports: [DraggableModule]
    });
    TestBed.overrideComponent(TestNGDraggableDirectiveComponent, {set: {template: html}});
    fixture = TestBed.createComponent(TestNGDraggableDirectiveComponent);
    context = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('#c1');
    clean = fixture.nativeElement.querySelector('#c2');
    fixture.detectChanges();
  });

  it('fixture should not be null', () => {
    expect(fixture).not.toBeNull();
  });
});

// @Component({
//   selector: 'draggable-test',
//   template: ''
// })
// class TestNGDraggableComponent {
// }
