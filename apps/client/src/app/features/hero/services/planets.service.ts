import { inject, Injectable } from '@angular/core';

import { LoggingService } from '@client/app/core/services';
import { Planets } from '@client/app/features/hero/models/types';

@Injectable({
  providedIn: 'root',
})
// This service is responsible for providing the planets data to the hero component
export class PlanetsService {
  private readonly _logginService: LoggingService = inject(LoggingService);

  // The planets data is stored in a private property
  private _planets: Planets = [
    {
      pluto: {
        id: 9,
        name: 'Pluto',
        details: {
          coordinates: {
            sm: {
              top: 75,
              left: 15,
            },
            lg: {
              top: 72,
              left: 2,
            },
            fourK: {
              top: 70,
              left: 1,
            },
          },
          sizes: {
            sm: {
              width: 90,
              height: 90,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/pluto-81w_7FOOyYshH.webp?tr=w-90,q-85',
            },
            lg: {
              width: 220,
              height: 220,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/pluto-81w_7FOOyYshH.webp?tr=w-220,q-85',
            },
            fourK: {
              width: 440,
              height: 440,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/pluto-81w_7FOOyYshH.webp?tr=w-440,q-85',
            },
          },
        },
      },
    },
    {
      neptune: {
        id: 8,
        name: 'Neptune',
        details: {
          coordinates: {
            sm: {
              top: 65,
              left: 78,
            },
            lg: {
              top: 68,
              left: 88,
            },
            fourK: {
              top: 62,
              left: 90,
            },
          },
          sizes: {
            sm: {
              width: 40,
              height: 40,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/neptune-128w_h7XvA94oy2.webp?tr=w-40,q-85',
            },
            lg: {
              width: 50,
              height: 50,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/neptune-128w_h7XvA94oy2.webp?tr=w-50,q-85',
            },
            fourK: {
              width: 100,
              height: 100,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/neptune-128w_h7XvA94oy2.webp?tr=w-100,q-85',
            },
          },
        },
      },
    },
    {
      uranus: {
        id: 7,
        name: 'Uranus',
        details: {
          coordinates: {
            sm: {
              top: 58,
              left: 91,
            },
            lg: {
              top: 62,
              left: 92,
            },
            fourK: {
              top: 53,
              left: 95,
            },
          },
          sizes: {
            sm: {
              width: 18,
              height: 18,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/uranus-122w_avMd311Qk.webp?tr=w-18,q-85',
            },
            lg: {
              width: 25,
              height: 25,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/uranus-122w_avMd311Qk.webp?tr=w-25,q-85',
            },
            fourK: {
              width: 50,
              height: 50,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/uranus-122w_avMd311Qk.webp?tr=w-50,q-85',
            },
          },
        },
      },
    },
    {
      saturn: {
        id: 6,
        name: 'Saturn',
        details: {
          coordinates: {
            sm: {
              top: 50,
              left: 15,
            },
            lg: {
              top: 52,
              left: 17,
            },
            fourK: {
              top: 48,
              left: 20,
            },
          },
          sizes: {
            sm: {
              width: 22,
              height: 18,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/saturn-197w_EbAIsJD3W.webp?tr=w-22,q-85',
            },
            lg: {
              width: 26,
              height: 22,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/saturn-197w_EbAIsJD3W.webp?tr=w-26,q-85',
            },
            fourK: {
              width: 52,
              height: 48,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/saturn-197w_EbAIsJD3W.webp?tr=w-52,q-85',
            },
          },
        },
      },
    },
    {
      jupiter: {
        id: 5,
        name: 'Jupiter',
        details: {
          coordinates: {
            sm: {
              top: 40,
              left: 80,
            },
            lg: {
              top: 38,
              left: 82,
            },
            fourK: {
              top: 40,
              left: 80,
            },
          },
          sizes: {
            sm: {
              width: 10,
              height: 10,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/jupiter-152w_uxsDvs05P.webp?tr=w-10,q-85',
            },
            lg: {
              width: 14,
              height: 14,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/jupiter-152w_uxsDvs05P.webp?tr=w-14,q-85',
            },
            fourK: {
              width: 28,
              height: 28,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/jupiter-152w_uxsDvs05P.webp?tr=w-28,q-85',
            },
          },
        },
      },
    },
    {
      mars: {
        id: 4,
        name: 'Mars',
        details: {
          coordinates: {
            sm: {
              top: 35,
              left: 60,
            },
            lg: {
              top: 35,
              left: 65,
            },
            fourK: {
              top: 35,
              left: 70,
            },
          },
          sizes: {
            sm: {
              width: 8,
              height: 8,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mars-101w_5K_Urmxkg.webp?tr=w-8,q-85',
            },
            lg: {
              width: 12,
              height: 12,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mars-101w_5K_Urmxkg.webp?tr=w-12,q-85',
            },
            fourK: {
              width: 24,
              height: 24,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mars-101w_5K_Urmxkg.webp?tr=w-24,q-85',
            },
          },
        },
      },
    },
    {
      earth: {
        id: 3,
        name: 'Earth',
        details: {
          coordinates: {
            sm: {
              top: 30,
              left: 50,
            },
            lg: {
              top: 30,
              left: 50,
            },
            fourK: {
              top: 25,
              left: 50,
            },
          },
          sizes: {
            sm: {
              width: 6,
              height: 6,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/earth-129w_UtV9wFkDOr.webp?tr=w-6,q-85',
            },
            lg: {
              width: 10,
              height: 10,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/earth-129w_UtV9wFkDOr.webp?tr=w-10,q-85',
            },
            fourK: {
              width: 20,
              height: 20,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/earth-129w_UtV9wFkDOr.webp?tr=w-20,q-85',
            },
          },
        },
      },
    },
    {
      venus: {
        id: 2,
        name: 'Venus',
        details: {
          coordinates: {
            sm: {
              top: 20,
              left: 5,
            },
            lg: {
              top: 15,
              left: 5,
            },
            fourK: {
              top: 22,
              left: 5,
            },
          },
          sizes: {
            sm: {
              width: 4,
              height: 4,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/venus-129w_i_aaTkGsB.webp?tr=w-4,q-85',
            },
            lg: {
              width: 8,
              height: 8,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/venus-129w_i_aaTkGsB.webp?tr=w-8,q-85',
            },
            fourK: {
              width: 16,
              height: 16,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/venus-129w_i_aaTkGsB.webp?tr=w-16,q-85',
            },
          },
        },
      },
    },
    {
      mercury: {
        id: 1,
        name: 'Mercury',
        details: {
          coordinates: {
            sm: {
              top: 15,
              left: 40,
            },
            lg: {
              top: 12,
              left: 40,
            },
            fourK: {
              top: 15,
              left: 40,
            },
          },
          sizes: {
            sm: {
              width: 2,
              height: 2,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mercury-75w_uDsfzfhJY.webp?tr=w-2,q-85',
            },
            lg: {
              width: 5,
              height: 5,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mercury-75w_uDsfzfhJY.webp?tr=w-5,q-85',
            },
            fourK: {
              width: 10,
              height: 10,
              image:
                'https://ik.imagekit.io/maurogonzalezdev/portfolio/mercury-75w_uDsfzfhJY.webp?tr=w-10,q-85',
            },
          },
        },
      },
    },
  ];

  /**
   * Getter for the planets data.
   * @returns {Planets} The planets data.
   * @description This method returns the planets data stored in the service.
   */
  get getPlanets(): Planets {
    this._logginService.log(
      'info',
      'Planets data retrieved from PlanetsService'
    );
    return this._planets;
  }
}
