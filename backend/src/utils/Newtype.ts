export interface Newtype<T> {
  _value: T
}

export function wrap<T>(value: T): Newtype<T> {
  return {
    _value: value,
  }
}

export function unwrap<T>(wrappedValue: Newtype<T>): T {
  return wrappedValue._value
}
