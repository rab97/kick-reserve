import { IsDefined, IsEnum } from 'class-validator';
import { Environment } from '../enums/environment.enum';

export class EnvironmentVariables {
  @IsDefined()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsDefined()
  API_HOST = '0.0.0.0';

  @IsDefined()
  API_PORT = '8080';

  @IsDefined()
  FRONTEND_BASE_URL = 'https://e-commerce.com';

  @IsDefined()
  MONGO_URI: string;

  @IsDefined()
  DB_HOST: string;

  @IsDefined()
  TEST_DB_PORT: string;

  @IsDefined()
  DB_PORT: string;

  @IsDefined()
  TEST_DB_DATABASE: string;

  @IsDefined()
  DB_DATABASE: string;

  @IsDefined()
  TEST_DB_USERNAME: string;

  @IsDefined()
  DB_USERNAME: string;

  @IsDefined()
  TEST_DB_PASSWORD: string;

  @IsDefined()
  DB_PASSWORD: string;
}
