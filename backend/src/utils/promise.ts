import { matchW, none, Option, some } from "fp-ts/Option"
import { constant, pipe } from "fp-ts/lib/function"

export const optionPromise = <T>(o: Option<Promise<T>>): Promise<Option<T>> => {
  return pipe(
    o,
    matchW(constant(Promise.resolve(none as Option<T>)), (x) =>
      x.then((a) => some(a))
    )
  )
}

export const then = <T, U>(f: (a: T) => U): ((p: Promise<T>) => Promise<U>) => (
  p
) => p.then(f)
