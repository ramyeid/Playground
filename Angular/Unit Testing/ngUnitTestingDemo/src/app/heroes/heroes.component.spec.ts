import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let heroes;
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'Superdude', strength: 55 }
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    component = new HeroesComponent(mockHeroService);
  });


  describe('delete', () => {

    it ('should remove the indicated hero from hero list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;

      component.delete(heroes[2]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero with correct hero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;

      component.delete(heroes[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });

  });
});
