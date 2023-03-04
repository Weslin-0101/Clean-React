import { HttpPostClient, HttpStatusCode } from "@/data/protocols";
import { EmailInUseError, UnexpectedError } from "@/domain/errors";
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
    const httpResponse = await this._httpPostClient.post({
      url: this._url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
