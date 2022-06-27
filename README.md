[![codecov](https://codecov.io/gh/hebertcisco/nest-keycloak-middleware/branch/master/graph/badge.svg?token=E11YWYCJ5Q)](https://codecov.io/gh/hebertcisco/nest-keycloak-middleware)

[![Node.js build and publish package](https://github.com/hebertcisco/nest-keycloak-middleware/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/hebertcisco/nest-keycloak-middleware/actions/workflows/npm-publish.yml)

[![Running Code Coverage](https://github.com/hebertcisco/nest-keycloak-middleware/actions/workflows/coverage.yml/badge.svg)](https://github.com/hebertcisco/nest-keycloak-middleware/actions/workflows/coverage.yml)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nestjs](https://img.shields.io/badge/Nestjs-ea2845?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Free. Built on open source. Runs everywhere.](https://img.shields.io/badge/VS_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white)](https://github.com/hebertcisco/nest-keycloak-middleware/actions)

> This is an Nestjs implementation of the [keycloak-middleware-ts](https://www.npmjs.com/package/keycloak-middleware-ts) package..
## Installation

> Install with yarn or npm: `yarn` or `npm`:

```bash
# yarn
yarn add nest-keycloak-middleware
```

```bash
# npm
npm i nest-keycloak-middleware --save
```

```bash
# pnpm
pnpm add nest-keycloak-middleware --save
```

### Usage example:

```ts
// user.module.ts
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { KeycloakModule } from 'nest-keycloak-middleware';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { configService } from '../../infra/application/application.config';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        KeycloakModule.register({
            realm: configService.getValue('KEYCLOAK_REALM', true),
            authServerUrl: configService.getValue('KEYCLOAK_URL', true),
            clientId: configService.getValue('KEYCLOAK_CLIENT_ID', true),
            clientSecret: configService.getValue(
                'KEYCLOAK_CLIENT_SECRET',
                true,
            ),
            username: configService.getValue('KEYCLOAK_ADMIN', true),
            password: configService.getValue('KEYCLOAK_ADMIN_PASSWORD', true),
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
```

In your user.service.ts import the KeycloakService:

```ts
// user.service.ts
 import { KeycloakService } from 'nest-keycloak-middleware';
```

In your constructor pass the KeycloakService instance

```ts
// user.service.ts
 constructor(private readonly keycloakService: KeycloakService) {}
```

Create the interface, taking the necessary data

```ts
// create-user.dto.ts
export class CreateUserDto {
    @ApiProperty({ required: true, default: chance.name() })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ required: true, default: chance.name() })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ required: true, default: chance.email() })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true, default: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string;
}
```

As an example, use your keycloack context and create the user right away.

```ts
// user.service.ts
 public async create(createUserDto: CreateUserDto) {
        try {
            const passwordHash = await bcrypt.hash(createUserDto.password, 8);
            const user = this.userRepository.create({
                ...createUserDto,
                password: passwordHash,
            });
            const ctx = this.keycloakService.createKeycloakCtx();

            return ctx.users
                .create({
                    ...createUserDto,
                    username: user.id,
                    password: passwordHash,
                    enabled: true,
                })
                .then(() => this.userRepository.save(user))
                .catch((error) => error);
        } catch (error) {
            throw error;
        }
    }
```

 
## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffee 🙌🏾

<a href="https://www.buymeacoffee.com/hebertcisco">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hebertcisco&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
</a>

## 📝 License

Copyright © 2022 [Hebert F Barros](https://github.com/hebertcisco).<br />
This project is [MIT](LICENSE) licensed.
