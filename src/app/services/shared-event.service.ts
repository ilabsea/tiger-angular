import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedEventService {
    // https://stackoverflow.com/questions/37662456/angular-2-output-from-router-outlet
    // Observable string sources
    private emitChangeSource = new Subject<any>();

    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();

    // Service message commands
    emitChange(change: any) {
      this.emitChangeSource.next(change);
    }
}
