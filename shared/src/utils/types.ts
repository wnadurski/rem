export type Values<T> = T extends readonly any[] ? T[number] : T[keyof T]
