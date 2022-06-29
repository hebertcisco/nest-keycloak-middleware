import { Test, TestingModule } from '@nestjs/testing';
import AccessToken from 'keycloak-middleware-ts/lib/AccessToken';

import { KeycloakServiceMock } from '../tests/mock/KeycloakService.mock';
import { KeycloakService } from './keycloak.service';

import { mockConfig, mockAxiosInstance } from '../tests/setup';
import { mockAccessToken, validAccessToken } from '../tests/mock/tokens';

describe('KeycloakService', () => {
  let service: KeycloakService;
  let accessToken: AccessToken;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: KeycloakService,
          useClass: KeycloakServiceMock,
        },
      ],
    }).compile();

    service = module.get<KeycloakService>(KeycloakService);
    accessToken = new AccessToken(mockConfig, mockAxiosInstance);
  });

  describe('AccessToken.info', () => {
    it('should call the endpoint once', async () => {
      await accessToken.info(mockAccessToken);
      expect(mockAxiosInstance._getCalls).toEqual(1);
    });
  });

  describe('AccessToken.get', () => {
    it('should call the endpoint once', async () => {
      await accessToken.get();
      expect(mockAxiosInstance._postCalls).toEqual(1);
    });
  });

  describe('AccessToken.refresh', () => {
    it('should call the endpoint at least once', async () => {
      await accessToken.refresh(mockAccessToken);
      expect(mockAxiosInstance._postCalls).toBeGreaterThanOrEqual(1);
    });
  });

  describe('KeycloakService', () => {
    it('Should validate the .post() token', async () => {
      const token = await mockAxiosInstance.post('token');
      expect(String(token.data?.access_token)).toBe(validAccessToken);
    });
  });
  afterEach(() => {
    mockAxiosInstance.refresh();
  });
  afterEach(() => {
    mockAxiosInstance.refresh();
  });
});
