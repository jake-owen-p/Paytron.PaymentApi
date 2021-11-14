// below stolen from https://stackoverflow.com/questions/42674473/get-all-keys-of-a-deep-object-in-javascript
// @ts-ignore
export const objectDeepKeys = (obj: any) => Object.keys(obj).filter(key => obj[key] instanceof Object).map(key => objectDeepKeys(obj[key]).map(k => `${key}.${k}`)).reduce((x, y) => x.concat(y), Object.keys(obj));
