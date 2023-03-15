import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
  HttpGetClient,
  HttpGetParams,
} from "@/data/protocols/http";

import faker from "faker";

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: {
    key: "any_key",
  },
});

export class HttpPostClientSpy<R = any> implements HttpPostClient {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
