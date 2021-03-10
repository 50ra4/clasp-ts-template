import * as fs from 'fs';
import { Either, tryCatch, toError } from 'fp-ts/Either';

type ObjectType = Record<string, unknown>;
type EmptyObject = Record<string, never>;

export const readJsonFile = <T extends ObjectType = EmptyObject>(path: string): Either<Error, T> =>
  tryCatch(
    () => JSON.parse(fs.readFileSync(path, 'utf-8')) as T,
    (e) => toError(e),
  );

export const createJsonFile = <T extends ObjectType = EmptyObject>(path: string, data: T): Either<Error, void> =>
  tryCatch(
    () => fs.writeFileSync(path, JSON.stringify(data)),
    (e) => toError(e),
  );

export const createEnvironmentFile = <T extends ObjectType = EmptyObject>(path: string, data: T): Either<Error, void> =>
  tryCatch(
    () =>
      fs.writeFileSync(
        path,
        Object.entries(data)
          .map(([key, value]) => `${key} = ${value}`)
          .join('\n'),
      ),
    (e) => toError(e),
  );

export const createDirectory = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

export const throwError = <E = unknown>(error: E): never => {
  throw error;
};

export const exitProcessError = <E = unknown>(error: E): never => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
};

export const ifElse = <A extends ReadonlyArray<unknown>, B, C>(
  fn: (...a: A) => boolean,
  onTrue: (...a: A) => B,
  onFalse: (...a: A) => C,
): ((...a: A) => B | C) => {
  return (...args: A) => {
    if (fn(...args)) {
      return onTrue(...args);
    } else {
      return onFalse(...args);
    }
  };
};
