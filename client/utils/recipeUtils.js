import formatQuantity from 'format-quantity';

export function stringifyInstruction(instruction) {
  let string = '';
  if (instruction.quantity) {
    string = string.concat(formatQuantity(instruction.quantity) + ' ');
  }
  if (instruction.quantity2) {
    string = string.concat('-' + instruction.quantity2 + ' ');
  }
  if (instruction.unitOfMeasure) {
    string = string.concat(instruction.unitOfMeasure + ' ');
  }
  if (instruction.description) {
    string = string.concat(instruction.description);
  }
  return string;
}

//
