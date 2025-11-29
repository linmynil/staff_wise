import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV();
// save and get string
export const setString = (key: string, value: string) => mmkv.set(key, value);
export const getString = (key: string) => mmkv.getString(key) || null;

// save and get number
export const setNumber = (key: string, value: number) => mmkv.set(key, value);
export const getNumber = (key: string) => mmkv.getNumber(key) ?? null;

// save and get boolean
export const setBoolean = (key: string, value: boolean) => mmkv.set(key, value);
export const getBoolean = (key: string) => mmkv.getBoolean(key) ?? null;

// save and get object
export const setObject = <T>(key: string, value: T) =>
  mmkv.set(key, JSON.stringify(value));
export const getObject = <T>(key: string): T | null => {
  const jsonString = mmkv.getString(key);
  return jsonString ? JSON.parse(jsonString) : null;
};

// remove key
export const removeKey = (key: string) => mmkv.delete(key);

// check if key exists
export const hasKey = (key: string) => mmkv.contains(key);
