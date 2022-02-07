import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { apiConfig } from '../config/configurations'
import { validateConfig } from '../config/validateConfig'
import { PrismaModule } from '../prisma/prisma.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [apiConfig],
            validate: validateConfig
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
