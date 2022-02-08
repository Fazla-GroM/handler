import { IsNumber, IsString } from 'class-validator'

export class EnvVarsDto {
    @IsString()
    API_PREFIX: string

    @IsNumber()
    API_PORT: number

    @IsString()
    API_DOCS_PREFIX: string

    @IsString()
    FIREBASE_TYPE: string

    @IsString()
    FIREBASE_PROJECT_ID: string

    @IsString()
    FIREBASE_PRIVATE_KEY_ID: string

    @IsString()
    FIREBASE_PRIVATE_KEY: string

    @IsString()
    FIREBASE_CLIENT_EMAIL: string

    @IsString()
    FIREBASE_CLIENT_ID: string

    @IsString()
    FIREBASE_AUTH_URI: string

    @IsString()
    FIREBASE_TOKEN_URI: string

    @IsString()
    FIREBASE_AUTH_CERT_URL: string

    @IsString()
    FIREBASE_CLIENT_CERT_URL: string
}
