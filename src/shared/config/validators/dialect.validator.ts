import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';
import { Dialects, Dialect } from '../enviroment/dialect';

export const IS_VALID_DIALECT = 'isValidDialect';

export function IsValidDialect(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    ValidateBy(
      {
        name: IS_VALID_DIALECT,
        validator: {
          validate(value: Dialect) {
            return typeof value === 'string' && Dialects.includes(value);
          },
          defaultMessage: buildMessage(
            (eachPrefix) =>
              `${eachPrefix}($property) must be a valid dialect (${Dialects.join(', ')})`,
            validationOptions,
          ),
        },
      },
      {},
    )(object, propertyName);
  };
}
