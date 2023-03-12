import { AxiosHttpClient } from "@/infra/http/axios-http-client/axios-http-client";
import { mockPostRequest } from "@/tests/database/mocks";
import { mockAxios, mockHttpResponse } from "@/tests/infra/mocks";

import axios from "axios";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe("AxiosHttpClient", () => {
  describe("Post", () => {
    test("Should call axios.post with correct values", async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test("Should return the correct response on axios.post", () => {
      const { sut, mockedAxios } = makeSut();
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });

    test("Should return the correct error on axios.post", () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });
});
