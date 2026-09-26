import { AccountTypeOrmEntity } from 'src/modules/account/infrastructure/persistence/account.typeorm.entity';
import { BaseTypeOrmEntity } from 'src/shared/infrastructure/persistence/base.typeorm.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ScheduleStatus } from '../../domain/enums/schedule-status.enum';

@Entity('schedules')
@Index(['payer'])
@Index(['receiver'])
export class ScheduleTypeOrmEntity extends BaseTypeOrmEntity {
  @ManyToOne(() => AccountTypeOrmEntity, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'payer_id' })
  public payer!: AccountTypeOrmEntity;

  @ManyToOne(() => AccountTypeOrmEntity, {
    onDelete: 'RESTRICT',
    nullable: false,
  })
  @JoinColumn({ name: 'receiver_id' })
  public receiver!: AccountTypeOrmEntity;

  @Column({ nullable: false })
  public value!: number;

  @Column({ name: 'scheduled_for', type: 'timestamptz', nullable: false })
  public scheduledFor!: Date;

  @Column({
    type: 'enum',
    enum: ScheduleStatus,
    default: ScheduleStatus.PENDING,
  })
  public status!: ScheduleStatus;
}
