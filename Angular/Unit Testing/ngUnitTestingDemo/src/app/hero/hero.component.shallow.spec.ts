import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroComponent } from './hero.component';

describe('HeroComponent (shallow tests)', () => {

  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };

    const actualName = fixture.componentInstance.hero.name;

    expect(actualName).toEqual('SuperDude');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();

    // nativeElement => is the DOM.
    // we are querying and getting the tag 'a' using querySelector
    expect(fixture.nativeElement.querySelector('a').textContent).toEqual('1 SuperDude\n');
  });

  // another way to write the same test
  it('should render the hero name in an anchor tag2', () => {
    fixture.componentInstance.hero = { id: 1, name: 'SuperDude', strength: 3 };
    fixture.detectChanges();

    //debug Element is a wrapper around the dom node.
    const debugElementAnchor = fixture.debugElement.query(By.css('a'));
    expect(debugElementAnchor.nativeElement.textContent).toEqual('1 SuperDude\n');
  });

});
