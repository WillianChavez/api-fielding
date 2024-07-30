import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnviromentVariables } from '../entities/enviroment-variables.entity';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnviromentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {});

  if (errors.length > 0) {
    let messageOfErrorsContraints = '';
    for (const error of errors) {
      if (error.constraints) {
        messageOfErrorsContraints +=
          error.property +
          ': ' +
          Object.values(error.constraints).join(', ') +
          '. ' +
          '\n';
      }
    }
    throw new Error(
      `Config validation error: \n\n${messageOfErrorsContraints}`,
    );
  }

  return validatedConfig;
}
