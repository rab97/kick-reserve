import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { FootballFieldsModule } from './features/football-fields/football-fields.module';
import { PlayersModule } from './features/players/players.module';
import { TeamsModule } from './features/teams/teams.module';
import { UsersModule } from './features/users/users.module';
import { EnvironmentVariables } from './types/environment-variables.types';
import { validate } from './utils/env.util';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
            validate,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
                type: 'mongodb',
                url: configService.get<string>('MONGO_URI'),
                synchronize: configService.get('NODE_ENV') === 'development',
                autoLoadEntities: true,
            }),
        }),
        UsersModule,
        FootballFieldsModule,
        TeamsModule,
        PlayersModule,
    ],
    controllers: [AppController],
    exports: [ConfigModule],
})
export class AppModule {}
