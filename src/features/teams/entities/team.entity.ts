import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Player } from '../../players/entities/player.entity';

export type TeamCode = string;

@Entity()
export class Team {
  constructor(team: Partial<Team>) {
    this.code = uuid();
    this.name = team?.name ?? '';
    this.picture = team?.picture ?? null;
  }
  /**
   * The document identifier
   */
  @ObjectIdColumn({
    name: '_id',
    comment: 'The document identifier',
    type: 'varchar',
  })
  _id: ObjectId;

  /**
   * The team code identifier
   */
  @Column({
    name: 'code',
    comment: 'The team code identifier',
    unique: true,
    nullable: false,
    type: 'varchar',
    default: uuid(),
  })
  code: TeamCode;

  /**
   * The team's name
   */
  @Column({
    name: 'name',
    comment: "The team's name",
    type: 'varchar',
    nullable: false,
  })
  name: string;

  /**
   * The team's picture
   */
  @Column({
    name: 'picture',
    comment: "The team's picture",
    type: 'varchar',
    nullable: true,
    default: null,
  })
  picture?: string | null;

  /**
   * The captain of this team
   */
  @ManyToOne(() => Player, (player) => player.teamsCaptain, { nullable: true })
  captain?: Player;

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
