import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class Loading
{
  public static onChange = new Subject<boolean>();

  public static show()
  {
    alert("dcf");
    Loading.onChange.next(true);
  }

  public static hide()
  {
    Loading.onChange.next(false);
  }
}
