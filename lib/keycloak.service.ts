import createKeycloakCtx, {
  secureKeyFormat,
  validKeyEnd,
  validKeyStart,
} from 'keycloak-middleware-ts';

import { Inject } from '@nestjs/common';

import type { AxiosInstance } from 'axios';

import { KEYCLOACK_TOKEN } from './keycloak.constants';

import type { KeycloakConfig } from './interfaces';

export class KeycloakService {
  constructor(
    @Inject(KEYCLOACK_TOKEN)
    protected readonly config: KeycloakConfig,
  ) {}
  public validKeyStart(key: string): boolean {
    return validKeyStart(key);
  }
  public validKeyEnd(key: string) {
    return validKeyEnd(key);
  }
  public secureKeyFormat(key: string): string {
    return secureKeyFormat(key);
  }
  public createKeycloakCtx(request?: AxiosInstance | any) {
    return createKeycloakCtx(this.config, request);
  }
}
