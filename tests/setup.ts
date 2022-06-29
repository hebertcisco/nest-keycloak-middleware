import { KeycloakConfig } from 'keycloak-middleware-ts/lib/interfaces';
import { cert } from './mock/cert';
import { chance } from './mock/chance';
import { expiredToken, validAccessToken } from './mock/tokens';

export const mockConfig: KeycloakConfig = {
  realm: 'test',
  authServerUrl: 'https://localhost:8081',
  clientId: 'abc123',
  username: 'test_user',
  password: 'test_user_pass',
  jwtKey: cert,
  jwtKeyAlgorithms: ['ES512'],
};

export class MockAxios {
  _getCalls = 0;
  _putCalls = 0;
  _postCalls = 0;

  async get() {
    this._getCalls++;
    return Promise.resolve(null);
  }

  async post(endpoint: string): Promise<any> {
    this._postCalls++;

    if (endpoint.includes('token'))
      return Promise.resolve({
        data: { refresh_token: expiredToken, access_token: validAccessToken },
        headers: { location: '/token' },
      });

    return Promise.resolve({
      data: {
        sub: 0,
        email_verified: true,
        name: chance.name(),
        preferred_username: chance.name(),
        given_name: chance.name_suffix(),
        family_name: chance.name_prefix(),
        email: chance.email(),
      },
      headers: { location: '/1' },
    });
  }

  async put() {
    this._putCalls++;
    return Promise.resolve(null);
  }

  refresh() {
    this._getCalls = 0;
    this._putCalls = 0;
    this._postCalls = 0;
  }
}

export const mockAxiosInstance = new MockAxios();
