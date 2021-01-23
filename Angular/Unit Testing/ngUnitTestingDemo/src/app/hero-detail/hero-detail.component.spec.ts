import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TestBed, ComponentFixture, fakeAsync, tick, flush, async } from '@angular/core/testing';
import { Location } from '@angular/common';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './../hero.service';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {

  let mockActivatedRoute, mockHeroService, mockLocation;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(() => {
    // we can used jasmine but this is another way
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' } }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ],
      imports: [ FormsModule ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: 'SuperDude', strength: 100 }));
  });

  it('should render hero name in h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // not best practice to setTimeout in the tests
  // old save function
  it ('should call updateHero when save is called - Not best practice', (done) => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);
  });

  // fakeAsync create a special zone where all calls are synchronous
  // no wait is done
  // old save function
  // this test works with promise and set timeout
  it ('should call updateHero when save is called - best practice', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    // tick(250);
    flush(); // => instead of tick

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  // using promises
  // all of thes tests function are done because angular run with zonejs
  // this test does nt work with timeout
  it ('should call updateHero when save is called - best practice', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    // will be called when all promises are done
    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
     });
  }));

});
