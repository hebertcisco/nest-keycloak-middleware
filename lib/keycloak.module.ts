import { DynamicModule, Module, Provider } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { KeycloakService } from './keycloak.service';

import {
  KEYCLOACK_TOKEN,
  KEYCLOACK_MODULE_ID,
  KEYCLOACK_MODULE_OPTIONS,
} from './keycloak.constants';

import type {
  HttpModuleAsyncOptions,
  HttpModuleOptions,
  HttpModuleOptionsFactory,
} from './interfaces';

@Module({
  providers: [KeycloakService],
  exports: [KeycloakService],
})
export class KeycloakModule {
  static register(config: HttpModuleOptions): DynamicModule {
    return {
      module: KeycloakModule,
      providers: [
        {
          provide: KEYCLOACK_TOKEN,
          useValue: config,
        },
        {
          provide: KEYCLOACK_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  static registerAsync(options: HttpModuleAsyncOptions): DynamicModule {
    return {
      module: KeycloakModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: KEYCLOACK_TOKEN,
          useFactory: (config: HttpModuleOptions) => config,
          inject: [KEYCLOACK_MODULE_OPTIONS],
        },
        {
          provide: KEYCLOACK_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        ...(options.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(
    options: HttpModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: HttpModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KEYCLOACK_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: KEYCLOACK_MODULE_OPTIONS,
      useFactory: async (optionsFactory: HttpModuleOptionsFactory) =>
        optionsFactory.createHttpOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
