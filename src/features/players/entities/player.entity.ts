import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { PlayerRole } from '../../../enums/player-role.enum';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';

export type PlayerCode = string;

@Entity()
export class Player {
  constructor(player: Partial<Player>) {
    this.code = uuid();
    this.visible = player?.visible ?? false;
    this.role = player?.role ?? null;
  }
  /**
   * The document identifier
   */
  @ObjectIdColumn({
    name: 'id',
    comment: 'The document identifier',
    type: 'varchar',
  })
  _id: ObjectId;

  /**
   * The player code identifier
   */
  @Column({
    name: 'code',
    comment: 'The Player code identifier',
    unique: true,
    nullable: false,
    type: 'varchar',
    default: uuid(),
  })
  code: PlayerCode;

  /**
   * The user linked to this player
   */
  @Column({
    name: 'user',
    comment: 'The user linked to this player',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.player, { cascade: true })
  user: User;

  @OneToMany(() => Team, (team) => team.captain, {
    nullable: true,
    cascade: true,
  })
  teamsCaptain?: Team[];

  /**
   * Role of the user
   */
  @Column({ type: 'enum', enum: PlayerRole, nullable: true })
  role?: PlayerRole | null;

  /**
   * Indicates wheter information are availbale for the other players
   */
  @Column({
    name: 'visible',
    comment: 'Indicates wheter information are available for the other players',
    default: false,
  })
  visible: boolean;

  /**
   * The date when this entity was created
   */
  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp',
    comment: 'The date when this entity was created',
  })
  @Type(() => Date)
  createdAt: Date;

  /**
   * The date when this entity was updated
   */
  @UpdateDateColumn({
    name: 'updatedAt',
    type: 'timestamp',
    comment: 'The date when this entity was updated',
  })
  @Type(() => Date)
  updatedAt: Date;
}
