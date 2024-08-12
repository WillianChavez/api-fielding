export abstract class BaseMapper<E, M> {
  abstract toDomain(model: M): E;
  abstract toPersistence(domain: E): M;
}
