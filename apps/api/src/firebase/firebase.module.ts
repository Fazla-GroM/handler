import { DynamicModule, Global, Module, ModuleMetadata, FactoryProvider } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { FirebaseService } from './firebase.service'

const FIREBASE_ADMIN_MODULE_OPTIONS = 'FIREBASE_ADMIN_MODULE_OPTIONS'

interface FirebaseAdminModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'>,
        Omit<FactoryProvider<admin.AppOptions>, 'provide'> {}

@Global()
@Module({})
export class FirebaseModule {
    static readonly createCredential = admin.credential.cert

    static forRootAsync(options: FirebaseAdminModuleAsyncOptions): DynamicModule {
        const firebaseAdminModuleOptions = {
            provide: FIREBASE_ADMIN_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject || []
        }

        return {
            module: FirebaseModule,
            imports: options.imports,
            providers: [
                firebaseAdminModuleOptions,
                {
                    provide: FirebaseService,
                    useFactory(options: admin.AppOptions) {
                        const app = !admin.apps.length ? admin.initializeApp(options) : admin.apps[0]

                        return new FirebaseService(app)
                    },
                    inject: [FIREBASE_ADMIN_MODULE_OPTIONS]
                }
            ],
            exports: [FirebaseService]
        }
    }
}
