import { HttpPostClient } from "@/data/protocols";
import { AccountModel } from "@/domain/models";
import { AddAccount, AddAccountParams } from "@/domain/usecases";

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly _url: string,
    private readonly _httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}

  async add(params: AddAccountParams): Promise<AccountModel> {
    await this._httpPostClient.post({
      url: this._url,
      body: params,
    });
    return Promise.resolve(null);
  }
}
