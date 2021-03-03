import { fromEvent, of, Observable } from 'rxjs';
import { switchMap, catchError, filter } from 'rxjs/operators';
import { isValidCoords } from './functions';

function formStream$(modal) {
  const form = modal.getForm();

  return fromEvent(form, 'click').pipe(

    filter(({ target }) => target.classList.contains('modal-btn')),
    switchMap((event) => {
      if (event.target.classList.contains('cancel-btn')) {
        modal.hide();
        return of(null);
      }

      if (event.target.classList.contains('ok-btn')) {
        const coords = modal.getCoordinates();
        if (isValidCoords(coords)) {
          modal.hide();
          return of(coords);
        }

        return of('Invalid coords');
      }
    }),
  );
}


export function getTaskPossition$(modal) {
  return new Observable((observer) => {
    navigator.geolocation.getCurrentPosition((crd) => {
      observer.next({latitude: crd.coords.latitude, longitude: crd.coords.longitude});
      observer.complete();
    },
      (err) => {
      modal.show();
      observer.error(err);
      },
    )
  })
}

// export function getCurrentPosition$(modal) {


//   return new Observable((observer) => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords: { latitude, longitude } }) => {
//         observer.next({ latitude, longitude });
//         observer.complete();
//       },
//       (err) => {
//         modal.show();
//         observer.error(err);
//       },
//     );
//     return () => {};
//   });
// }

export function newTaskStream$(manager) {  //возвращаем getCerrentPosition$, если ошибка, то вызывает getForm() из Modal.js - getForm может выдать 'Invalid coords'.

  const modal = manager.getModalMy('geoModal');

   return of({}).pipe(
    switchMap(() => {
      if (!manager.state.conditions.geo) { //переключается на сервере
        return of(null);
      }


      return getTaskPossition$(modal).pipe(
        catchError(() => formStream$(modal)),
      );
    }),
  );
}
