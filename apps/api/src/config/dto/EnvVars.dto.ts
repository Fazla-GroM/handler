import { IsNumber, IsString } from 'class-validator'

export class EnvVarsDto {
    @IsString()
    API_PREFIX: string

    @IsNumber()
    API_PORT: number
}
