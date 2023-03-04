import { AddAccountParams } from "@/domain/usecases";

export const mockAddAccountParams = (): AddAccountParams => ({
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
  passwordConfirmations: "any_password",
});
