import { SetComplement } from '.';

/**
 * Represents all primitive types in JavaScript, opposite of object
 */
export type Primitive =
  | boolean
  | number
  | string
  | symbol
  | null
  | undefined;

/**
 * Imitate a Flow's "mixed type" - in contrast to `any` it doesn't disable type-checking
 * so you wont be able to pass it to typed code without a proper type guard
 * usefull to make a distinction between trusted (`any`) and untrusted (`mixed`) data
 * @see https://flow.org/en/docs/types/mixed/
 */
export type mixed = Primitive | { [k: string]: any };
export type unknown = {} | null | undefined;

type Foo = { type: 'foo' };
const isFoo = (thing: mixed): thing is Foo => {
  if (thing != null && typeof thing === 'object') {
    return thing.type === 'foo';
  } else {
    return false;
  }
};

const obj: mixed = {};
if (isFoo(obj)) {
  obj;
}

function stringify(value: mixed) {
  if (typeof value === 'string') {
    return '' + value; // Works!
  } else {
    return value;
  }
}
stringify('foo');
stringify(3.14);
stringify(null);
stringify({});
stringify(stringify);

const f1 = (str: string) => str;
f1(null as any);
f1(null as mixed);
f1(null as unknown);

/**
 * $Keys
 * @desc get the union type of all the keys in an object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-keys
 */
export type $Keys<T extends object> = (
  keyof T
);

/**
 * $Values
 * @desc get the union type of all the values in an object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-values
 */
export type $Values<T extends object> = (
  T[keyof T]
);

/**
 * $ReadOnly
 * @desc get the read-only version of a given object type `T`
 * @see https://flow.org/en/docs/types/utilities/#toc-readonly
 */
export type $ReadOnly<T extends object> = (
  Readonly<T>
);

/**
 * $Diff
 * @desc get the set difference of a given object types `T` and `U` (`T \ U`)
 * @see https://flow.org/en/docs/types/utilities/#toc-diff
 */
export type $Diff<T extends U, U extends object> = (
  Pick<T, SetComplement<keyof T, keyof U>>
);

/**
 * $PropertyType
 * @desc get the type of property of an object at a given key `K`
 * @see https://flow.org/en/docs/types/utilities/#toc-propertytype
 */
export type $PropertyType<T extends object, K extends keyof T> = (
  T[K]
);

/**
 * $ElementType
 * @desc get the type of elements inside of array, tuple or object of type `T`, that matches the given index type `K`
 * @see https://flow.org/en/docs/types/utilities/#toc-elementtype
 */
export type $ElementType<T extends {[P in K & any]: any }, K extends keyof T | number> = (
  T[K]
);
