import { StrengthPipe } from './strength.pipe';

// this is an isolated test of a pipe

describe('StrengthPipe', () => {

  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    const actualValue = pipe.transform(5);

    expect(actualValue).toEqual('5 (weak)');
  });

  it('should display strong if strength is 10', () => {
    const pipe = new StrengthPipe();

    const actualValue = pipe.transform(10);

    expect(actualValue).toEqual('10 (strong)');
  });

  it('should display strong if strength is 25', () => {
    const pipe = new StrengthPipe();

    const actualValue = pipe.transform(25);

    expect(actualValue).toEqual('25 (unbelievable)');
  });

});
