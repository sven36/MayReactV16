
const hasSymbol = typeof Symbol === 'function' && Symbol['for'];
export const REACT_ELEMENT_TYPE = hasSymbol
    ? Symbol.for('react.element')
    : 0xeac7;

export const ELEMENT_TYPE_STRING = 1;
export const ELEMENT_TYPE_FUNCTION = 2;
export const ELEMENT_TYPE_SVG = 3;
//之前是数字表示，时间长了就会分不清，故改成文字形式
export const REF_TYPE_STRING = 1;
export const REF_TYPE_FUNCTION = 2;
export const REF_TYPE_OBJECT = 3;