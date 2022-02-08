import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { apiConfig, ERegisteredConfigs, firebaseAdminConfig, TFirebaseAdminConfig } from '../config/configurations'
import { validateConfig } from '../config/validateConfig'
import { FirebaseModule } from '../firebase/firebase.module'
import { PrismaModule } from '../prisma/prisma.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [
        PrismaModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [apiConfig, firebaseAdminConfig],
            validate: validateConfig
        }),
        FirebaseModule.forRootAsync({
            useFactory(configService: ConfigService) {
                const firebaseConfig = configService.get<TFirebaseAdminConfig>(ERegisteredConfigs.firebaseAdmin)

                return {
                    credential: FirebaseModule.createCredential({
                        projectId: firebaseConfig.project_id,
                        clientEmail: firebaseConfig.client_email,
                        privateKey: firebaseConfig.private_key
                    })
                }
            },
            inject: [ConfigService]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
