import { Injectable as InjectableNest } from '@nestjs/common';

export function Injectable(): ClassDecorator {
  return InjectableNest();
}
