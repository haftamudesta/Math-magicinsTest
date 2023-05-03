import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import operate from '../logic/operate';
import Calculator from '../component/Calculator';
import calculate from '../logic/calculate';

test('Should render the calculate component', () => {
  const calculate = renderer.create(<calculate />).toJSON();
  expect(calculate).toMatchSnapshot();
});

test('AC should be on the document', () => {
  render(<Calculator />);
  const calculatorElement = screen.getByText('AC');
  expect(calculatorElement).toBeInTheDocument();
});

describe('Check if operate function gives the results', () => {
  const obj = {
    a: 200,
    b: 50,
  };
  test('Test multiply a * b to get 10,000', () => {
    expect(operate(obj.a, obj.b, 'x')).toBe('10000');
  });

  test('Test subtract a - b to get 150', () => {
    expect(operate(obj.a, obj.b, '-')).toBe('150');
  });

  test('Test Add a + b to get 250', () => {
    expect(operate(obj.a, obj.b, '+')).toBe('250');
  });

  test('Test divide a ÷ b to get 4', () => {
    expect(operate(obj.a, obj.b, '÷')).toEqual('4');
  });

  test('Test remainder a % b to get 0', () => {
    expect(operate(obj.a, obj.b, '%')).toEqual('0');
  });
});

describe('Testing calculate', () => {
  const obj = {
    total: null,
    next: null,
    operation: null,
  };
  it('AC to be null', () => {
    obj.next = 88;
    const result = calculate(obj, 'AC');
    expect(result).toMatchObject({ total: null, next: null, operation: null });
  });
  it('AC to be null', () => {
    obj.next = 88;
    const result = calculate(obj, 'AC');
    expect(result).toMatchObject({ total: null, next: null, operation: null });
  });
  it('= is pressed with all the fields filled, it should return total with the operation executed', () => {
    obj.next = '12';
    obj.operation = '+';
    obj.total = '88';
    const result = calculate(obj, '=');

    expect(result.total).toBe('100');
  });
  it('3 is pressed with next already have 12, it should finih as 123', () => {
    obj.next = '12';
    obj.operation = null;
    obj.total = null;
    const result = calculate(obj, '3');

    expect(result.next).toBe('123');
  });
});
