import { Injectable } from '@nestjs/common'
import { app } from 'firebase-admin'

@Injectable()
export class FirebaseService {
    constructor(private readonly appInstance: app.App) {
        if (!this.appInstance) {
            throw new Error('No Firebase Instance')
        }
    }

    get auth() {
        return this.appInstance.auth()
    }

    get remoteConfig() {
        return this.appInstance.remoteConfig()
    }
}
