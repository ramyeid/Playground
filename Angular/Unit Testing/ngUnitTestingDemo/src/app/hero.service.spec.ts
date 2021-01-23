import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    // let heroService = TestBed.get(HeroService);
    // let messageService = TestBed.get(MessageService);
  });

  describe('getHero', () => {

    it('should call get with the correct URL',
        inject([HeroService, HttpTestingController],
            (heroService: HeroService, controller: HttpTestingController) => {

      // the subscribe is called after req.flush..
      heroService.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      httpTestingController.verify(); // => we get exactly what we are asserting for.
    }));

  });

});
