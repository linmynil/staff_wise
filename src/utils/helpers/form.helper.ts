import { ObjectSchema } from 'yup';

export const checkIsRequired = (validationSchema: ObjectSchema<any>) => (fieldName: string) => {
  const schemaDescription = validationSchema.describe();
  const field: any = schemaDescription.fields[fieldName];

  if (!field) return false;
  if ('optional' in field && field.optional === false) return true;
  if (field.tests && field.tests.some((t: any) => ['min', 'required'].includes(t.name))) {
    return true;
  }

  return false;
};

export const cleanData = <T extends Record<string, any>>(payload: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined,
    ),
  ) as Partial<T>;
};
