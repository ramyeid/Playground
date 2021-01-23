import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA, EventEmitter, Output, Directive } from '@angular/core';
import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroComponent } from './../hero/hero.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';


@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectivesStub {
  @Input('routerLink') linkParams: any;
  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}

describe('HeroesComponent (deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Superdude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [ HeroesComponent, HeroComponent, RouterLinkDirectivesStub ],
      providers: [ { provide: HeroService, useValue: mockHeroService } ],
      // schemas: [ NO_ERRORS_SCHEMA ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDebugElements.length).toEqual(3);
    for (let i = 0; i < heroComponentDebugElements.length; i++) {
      expect(heroComponentDebugElements[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`(1A) should call heroesComponent.deleteHero
      when the hero component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // we need the stopPropagation because in HeroComponent on the event
    // triggered by the button we are calling event.stopPropagation and event is a parameter
    // so we the click event is waiting for an object that have a stopPropagation function
    // we need to mock that method
    //      we could use jasmin to create a spy in order
    //      to mock this method but this is another way of doing it
    heroComponentDebugElements[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {} });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`(1B) should call heroService.deleteHero
      when the hero component's delete button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    mockHeroService.deleteHero.and.returnValue(of());
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // we need the stopPropagation because in HeroComponent on the event
    // triggered by the button we are calling event.stopPropagation and event is a parameter
    // so we the click event is waiting for an object that have a stopPropagation function
    // we need to mock that method
    //      we could use jasmin to create a spy in order
    //      to mock this method but this is another way of doing it
    heroComponentDebugElements[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {} });

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`(2) should call heroesComponent.deleteHero
      when the hero component's output event emitter is called => on delete`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (heroComponentDebugElements[0].componentInstance as HeroComponent).delete.emit();

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });


  it(`(3) should call heroesComponent.deleteHero
      when the hero dom event delete is triggered => on delete`, () => {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDebugElements = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // trigger event from the dom element
    heroComponentDebugElements[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });


  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const newHeroName = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({ id: 5, name: newHeroName, strength: 4 }));
    const inputDomElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputDomElement.value = newHeroName;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroesIdAndName: string = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroesIdAndName).toEqual(`1 SpiderDude\nx2 Wonderful Woman\nx3 Superdude\nx5 Mr. Ice\nx`);
    expect(heroesIdAndName).toContain(newHeroName);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const expectedRouter = '/detail/1';
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    const routerLink = heroComponents[0].query(By.directive(RouterLinkDirectivesStub)).injector.get(RouterLinkDirectivesStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe(expectedRouter);
  });

});
