import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface KeycloakConfig {
  realm: string;
  authServerUrl: string;
  clientId: string;
  clientSecret?: string;
  username: string;
  password: string;
  jwtKey?: string;
  jwtKeyAlgorithms?: Array<string>;
}

export interface KeycloakTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id?: string;
  email: string;
  enabled: boolean;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UpdateCredentialOptions {
  temporary?: boolean;
}

export type HttpModuleOptions = KeycloakConfig;

export interface HttpModuleOptionsFactory {
  createHttpOptions(): Promise<HttpModuleOptions> | HttpModuleOptions;
}

export interface HttpModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HttpModuleOptionsFactory>;
  useClass?: Type<HttpModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<HttpModuleOptions> | HttpModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
