import { compareDates } from '.';

describe('Function compareDates',()=>{
  it('should return 1, first date bigger than second',()=>{
    const testDateStrFirst = '2019-05-08T14:13:56.569Z';
    const testDateStrSecond = '2028-05-08T14:13:56.569Z';
    const expectedRes = 1;

    const calculateRes = compareDates(testDateStrFirst, testDateStrSecond);

    expect(calculateRes).toBe(expectedRes);
  });

  it('should return -1, first date smaller than second',()=>{
    const testDateStrFirst = '2019-05-08T14:13:56.569Z';
    const testDateStrSecond = '2018-05-08T14:13:56.569Z';
    const expectedRes = -1;

    const calculateRes = compareDates(testDateStrFirst, testDateStrSecond);

    expect(calculateRes).toBe(expectedRes);
  });

  it('should return 0, first equal to second',()=>{
    const testDateStrFirst = '2019-05-08T14:13:56.569Z';
    const testDateStrSecond = '2019-05-08T14:13:56.569Z';
    const expectedRes = 0;

    const calculateRes = compareDates(testDateStrFirst, testDateStrSecond);

    expect(calculateRes).toBe(expectedRes);
  });
});
