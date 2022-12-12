import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CoordsTrackerService {
  public coords$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:3000');

  public sendCoords(coords: any) {
    console.log('sendCoords: ', coords)
    this.socket.emit('coords', coords);
  }

  public getNewcoords = () => {
      this.socket.on('coords', (coords) =>{
        this.coords$.next(coords);
      });

    return this.coords$.asObservable();
  };

  public closeCommunication() {
    this.socket.disconnect();
  }
}

