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
  public createKeycloakCtx(request?: any) {
    void request;
    return jest.fn();
  }
}
