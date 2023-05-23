import { capitalizeFirstLetter } from './capitalizeFirstLetter';

test('capitalizeFirstLetter', () => {
  const inputStr = 'hello';
  const output = 'Hello';
  expect(capitalizeFirstLetter(inputStr)).toBe(output);
});
