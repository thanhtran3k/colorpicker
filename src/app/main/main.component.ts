import { Component } from '@angular/core';
import { ColorNumberEnum } from '@shared/enums/color-number.enum';
import { ColorTextEnum } from '@shared/enums/color-text.enum';
import { ColorOutput } from '@shared/models/ColorOutput.model';
import { AutoUnsub } from '@shared/decorators/autoUnsubscribe';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@AutoUnsub()
export class MainComponent {
  colorInput: any;
  colorOutput: ColorOutput = new ColorOutput();
  count: number = 0;
  invalidInput: boolean = false;
  timer: any;

  constructor() { }

  onKey(event: any) {
    this.colorInput = event.target.value;
  }

  randomProperty (obj: any) {
    var keys = Object.keys(obj);
    obj[keys[keys.length * Math.random() << 0]] += 1;
  };

  onButtonClick() {
    if (!this.colorInput) return;

    //Reset invalid flag
    this.invalidInput = false;

    //Parse the input to number
    let colorInput = +this.colorInput;

    //if the input return NaN so it should be string
    if (this.colorInput && isNaN(colorInput)) {
      switch (this.colorInput) {
        case ColorTextEnum.Red:
          colorInput = 1;
          break;
        case ColorTextEnum.Green:
          colorInput = 2;
          break;
        case ColorTextEnum.Blue:
          colorInput = 3;
          break;
        case ColorTextEnum.Random:
          colorInput = 4;
          break;
        default:
          this.invalidInput = true;
          return;
      }
    }

    switch (colorInput) {
      case ColorNumberEnum.Red:
        this.colorOutput.redOutput++;
        break;
      case ColorNumberEnum.Green:
        this.colorOutput.greenOutput++;
        break;
      case ColorNumberEnum.Blue:
        this.colorOutput.blueOutput++;
        break;
      case ColorNumberEnum.Random:
        this.randomProperty(this.colorOutput);
        break;
      default:
        this.invalidInput = true;
        break;
    }
  }

  resetCount() {
    const isDifferent = JSON.stringify(this.colorOutput) !== JSON.stringify(new ColorOutput());
    if (!isDifferent) return;

    this.colorOutput = new ColorOutput();
  }

  randomPicker() {
    //"count" variable is used for stoping the random picker.
    this.count++;

    if (this.count > 1) {
      this.count = 0;
      clearInterval(this.timer);
      return;
    }
    
    this.timer = setInterval(() => { 
      this.randomProperty(this.colorOutput);
    }, 1000);
  }
}