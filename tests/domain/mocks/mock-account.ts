import { AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";

import faker from "faker";

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: "any_token",
  name: "any_name",
});
