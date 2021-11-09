import { trigger, state, animate, style, transition } from '@angular/animations';

export function moveIn() {
  return trigger('moveIn', [
    state('void', style({ position: 'fixed', width: '100%' })),
    state('*', style({ position: 'fixed', width: '100%' })),
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(100px)' }),
      animate('.6s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: '1', transform: 'translateX(0)' }),
      animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
    ])
  ]);
}

export function fallIn() {
  return trigger('fallIn', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(40px)' }),
      animate('.4s .2s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: '1', transform: 'translateX(0)' }),
      animate('.3s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
    ])
  ]);
}

export function moveInLeft() {
  return trigger('moveInLeft', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-100px)' }),
      animate('.6s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ])
  ]);
}
export function moveInLefttab() {
  return trigger('moveInLefttab', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-100px)' }),
      animate('.9s .6s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ])
  ]);
}
export function moveInLefte() {
  return trigger('moveInLefte', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateX(-100px)' }),
      animate('.50s .80s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
    ])
  ]);
}
export function fallIne() {
  return trigger('fallIne', [
    transition(':enter', [
      style({ opacity: '0', transform: 'translateY(90px)' }),
      animate('.70s .88s ease-in-out', style({ opacity: '1', transform: 'translateY(0)' }))
    ]),
    transition(':leave', [
      style({ opacity: '1', transform: 'translateX(0)' }),
      animate('.60s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
    ])
  ]);
}
