export type Dict<T = any> = Record<string, T>;

// Number assertions
export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isNotNumber(value: any) {
    return typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value);
}

export function isNumeric(value: any) {
    return value != null && value - parseFloat(value) + 1 >= 0;
}

// Array assertions
export function isArray<T>(value: any): value is Array<T> {
    return Array.isArray(value);
}

// String assertions
export function isString(value: any): value is string {
    return Object.prototype.toString.call(value) === '[object String]';
  }
  