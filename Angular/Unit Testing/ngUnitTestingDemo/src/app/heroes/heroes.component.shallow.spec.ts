import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA, EventEmitter, Output } from '@angular/core';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  // create a fake component instead of using NO_ERRORS_SCHEMA and since it's a shallow test
  // we will not be testing the child class.
  @Component({
    selector: 'app-hero',
    template: '<p></p>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Superdude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, FakeHeroComponent ],
      providers: [ { provide: HeroService, useValue: mockHeroService } ],
      // schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from service', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // we can call this but then we're not really testing how in prod it's working
    // fixture.componentInstance.ngOnInit();

    expect(fixture.componentInstance.heroes.length).toEqual(3);
  });

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});
