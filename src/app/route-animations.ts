import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

export const fadeInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter', [
      style({
        opacity: 0,
      })
    ],
    {
        optional: true
    }),
     query(
      ':leave',
       [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
      { optional: true }
    )
  ]),
]);

