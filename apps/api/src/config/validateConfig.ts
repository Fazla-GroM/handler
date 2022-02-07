import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvVarsDto } from './dto/EnvVars.dto'

const validateConfig = (config: Record<string, unknown>) => {
    const validatedConfig = plainToClass(EnvVarsDto, config, { enableImplicitConversion: true })
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })

    // @TODO: Add Logger or smth
    if (errors.length > 0) {
        throw new Error(errors.toString())
    }

    return validatedConfig
}

export { validateConfig }
