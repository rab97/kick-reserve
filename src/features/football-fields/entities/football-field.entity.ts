import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export type FootballFieldCode = string;

@Entity()
export class FootballField {
    constructor(footballField: Partial<FootballField>) {
        this.code = uuid();
        this.name = footballField?.name ?? '';
        this.picture = footballField?.picture ?? null;
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
        comment: 'The football-field code identifier',
        unique: true,
        nullable: false,
        type: 'varchar',
        default: uuid(),
    })
    code: FootballFieldCode;

    /**
     * The football-fields's name
     */
    @Column({
        name: 'name',
        comment: "The football-field's name",
        type: 'varchar',
        nullable: false,
    })
    name: string;

    /**
     * The football-fields' picture
     */
    @Column({
        name: 'picture',
        comment: "The football-field's picture",
        type: 'varchar',
        nullable: true,
        default: null,
    })
    picture?: string | null;

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
