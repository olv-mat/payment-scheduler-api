export abstract class Mapper<DomainEntity, OrmEntity> {
  public abstract toDomain(ormEntity: OrmEntity): DomainEntity;
}
