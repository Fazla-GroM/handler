/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app/app.module'
import { ERegisteredConfigs, TApiConfig } from './config/configurations'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const apiConfiguration = configService.get<TApiConfig>(ERegisteredConfigs.api)
    app.setGlobalPrefix(apiConfiguration.prefix)
    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true
        })
    )

    const documentConfig = new DocumentBuilder()
        .setTitle('Handler')
        .setDescription('Handle your projects with ease!')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, documentConfig)
    SwaggerModule.setup('api/docs', app, document)

    await app.listen(apiConfiguration.port)
    Logger.log(`🚀 Application is running on: http://localhost:${apiConfiguration.port}/${apiConfiguration.prefix}`)
}

bootstrap()
