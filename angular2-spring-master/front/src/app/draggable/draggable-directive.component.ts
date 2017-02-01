import { Directive, Input, ElementRef, OnInit, OnChanges, SimpleChange } from '@angular/core';
import {DraggableProviderService} from '../service/draggable-provider.service';
import {draggable} from '../draggable/draggable.class';


@Directive({selector: '[draggable]'})
export class DraggableDirectiveComponent implements OnInit, OnChanges {
  @Input() public draggable: string;
  @Input() public draggableModel: any;
  @Input() public draggableOptions: any;
  private container: any;
  private drake: any;

  private el: ElementRef;
  private draggableService: DraggableProviderService;
  public constructor(el: ElementRef, draggableService: DraggableProviderService) {
    this.el = el;
    this.draggableService = draggableService;
    this.container = el.nativeElement;
  }

  public ngOnInit(): void {
    let bag = this.draggableService.find(this.draggable);
    let checkModel = () => {
      if (this.draggableModel) {
        if (this.drake.models) {
          this.drake.models.push(this.draggableModel);
        } else {
          this.drake.models = [this.draggableModel];
        }
      }
    };
    if (bag) {
      this.drake = bag.drake;
      checkModel();
      this.drake.containers.push(this.container);
    } else {
      this.drake = draggable([this.container], Object.assign({}, this.draggableOptions));
      checkModel();
      this.draggableService.add(this.draggable, this.drake);
    }
  }

  public ngOnChanges(changes: {draggableModel?: SimpleChange}): void {
    if (changes && changes.draggableModel) {
      if (this.drake) {
        if (this.drake.models) {
          let modelIndex = this.drake.models.indexOf(changes.draggableModel.previousValue);
          this.drake.models.splice(modelIndex, 1, changes.draggableModel.currentValue);
        } else {
          this.drake.models = [changes.draggableModel.currentValue];
        }
      }
    }
  }
}
