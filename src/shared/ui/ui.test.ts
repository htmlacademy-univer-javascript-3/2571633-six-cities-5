import { dateFormatter } from '.';

describe('Function dateFormatter',()=>{
  it('should return date in fullDate format',()=>{
    const testDateStr = '2019-05-08T14:13:56.569Z';
    const testFormat = 'fullDate';
    const expectedRes = '2019-05-08';

    const calculateRes = dateFormatter(testDateStr, testFormat);

    expect(calculateRes).toBe(expectedRes);
  });

  it('should return date in monthWithYear format',()=>{
    const testDateStr = '2019-05-08T14:13:56.569Z';
    const testFormat = 'monthWithYear';
    const expectedRes = 'May 2019';

    const calculateRes = dateFormatter(testDateStr, testFormat);

    expect(calculateRes).toBe(expectedRes);
  });

  it('should return date in monthWithYear format',()=>{
    const testDateStr = '2019-05-08T14:13:56.569Z';
    const expectedRes = 'May 2019';

    const calculateRes = dateFormatter(testDateStr);

    expect(calculateRes).toBe(expectedRes);
  });

  it('should return empty string',()=>{
    const testDateStr = '2019-qwe3:56.569Z';
    const testFormat = 'monthWithYear';
    const expectedRes = '';

    const calculateRes = dateFormatter(testDateStr, testFormat);

    expect(calculateRes).toBe(expectedRes);
  });
});
