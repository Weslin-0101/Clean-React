import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/usecases";
import { mockAccountModel } from "@/tests/domain/mocks";

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: AddAccountParams;

  add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
