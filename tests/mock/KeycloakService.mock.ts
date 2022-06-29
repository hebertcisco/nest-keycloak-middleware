import AccessToken from 'keycloak-middleware-ts/lib/AccessToken';
import Jwt from 'keycloak-middleware-ts/lib/Jwt';
import UserManager from 'keycloak-middleware-ts/lib/UserManager';

import type { AxiosInstance } from 'axios';

import { mockAxiosInstance, mockConfig } from '../setup';
import { mockAccessToken } from './tokens';
import type { KeycloakConfig } from '../../lib/interfaces';

class AccessTokenMock extends AccessToken {
  constructor(config: KeycloakConfig, request: AxiosInstance | any) {
    super(config, request);
  }

  info(accessToken: string): Promise<any> {
    return Promise.resolve(accessToken);
  }
  refresh(refreshToken: string): Promise<any> {
    return Promise.resolve(refreshToken);
  }
  get(): Promise<string> {
    return Promise.resolve(mockAccessToken);
  }
}
export class KeycloakServiceMock {
  constructor(protected readonly config: KeycloakConfig) {
    this.config = mockConfig;
  }
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
  public createKeycloakCtx(request?: any) {
    request = mockAxiosInstance;
    const jwt = new Jwt(this.config, request);

    const accessToken = new AccessTokenMock(
      this.config,
      request,
    ) as unknown as AccessToken;

    const users = new UserManager(this.config, request, accessToken);
    return {
      jwt: jwt,
      users: users,
      accessToken: accessToken,
    };
  }
}
