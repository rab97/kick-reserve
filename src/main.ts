import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import helmet from 'helmet';
import { version } from '../package.json';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { EnvironmentVariables } from './types/environment-variables.types';
import { wrapResponseSchemas } from './utils/openapi.util';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
        cors: true,
    });

    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: version.split('.')[0],
    });

    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: [`'self'`],
                    styleSrc: [`'self'`, `'unsafe-inline'`],
                    imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
                    scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
                },
            },
        }),
    );

    if (process.env.NODE_ENV === 'development') {
        const config = new DocumentBuilder()
            .setTitle('e-commerce API')
            .setDescription('e-commerce API')
            .setVersion(version)
            .addBearerAuth()
            .build();
        const document = wrapResponseSchemas(SwaggerModule.createDocument(app, config));
        writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
        SwaggerModule.setup('docs', app, document);
    }

    const configService: ConfigService<EnvironmentVariables> = app.get(ConfigService);

    const host = configService.get('API_HOST');
    const port = configService.get('API_PORT');
    await app.listen(port, host);
    Logger.log(`📡 Trader API is running on: http(s)://${host}${port ? `:${port}` : ''}`);
}

bootstrap();
