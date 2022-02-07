import { registerAs } from '@nestjs/config'

export enum ERegisteredConfigs {
    api = 'api'
}

export type TApiConfig = {
    port: number
    prefix: string
}

export type TConfig = {
    api: TApiConfig
}

const apiConfig = registerAs(ERegisteredConfigs.api, () => ({
    port: Number(process.env.API_PORT),
    prefix: process.env.API_PREFIX
}))

export { apiConfig }
