import { registerAs } from '@nestjs/config'

export enum ERegisteredConfigs {
    api = 'api',
    firebaseAdmin = 'firebaseAdmin'
}

export type TApiConfig = {
    port: number
    prefix: string
    docsPrefix: string
}

export type TFirebaseAdminConfig = {
    type: string
    project_id: string
    private_key_id: string
    private_key: string
    client_email: string
    client_id: string
    auth_uri: string
    token_uri: string
    auth_provider_x509_cert_url: string
    client_x509_cert_url: string
}

export type TConfig = {
    api: TApiConfig
    firebase: TFirebaseAdminConfig
}

const apiConfig = registerAs(ERegisteredConfigs.api, () => ({
    port: Number(process.env.API_PORT),
    prefix: process.env.API_PREFIX,
    docsPrefix: process.env.API_DOCS_PREFIX
}))

const firebaseAdminConfig = registerAs(ERegisteredConfigs.firebaseAdmin, () => ({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
}))

export { apiConfig, firebaseAdminConfig }
