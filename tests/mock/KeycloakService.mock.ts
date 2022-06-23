import AccessToken from 'keycloak-middleware-ts/lib/AccessToken';
import Jwt from 'keycloak-middleware-ts/lib/Jwt';
import UserManager from 'keycloak-middleware-ts/lib/UserManager';

import type { KeycloakConfig } from '../../lib/interfaces';

export class KeycloakServiceMock {
  constructor(protected readonly config: KeycloakConfig) {}
  public validKeyStart(key: string): boolean {
    void key;
    return true;
  }
  public validKeyEnd(key: string): boolean {
    void key;
    return true;
  }
  public secureKeyFormat(key: string): string {
    return key;
  }
  public createKeycloakCtx(request?: any): {
    jwt: Jwt;
    users: UserManager;
    accessToken: AccessToken;
  } {
    void request;
    throw new Error('Method not implemented.');
  }
}
