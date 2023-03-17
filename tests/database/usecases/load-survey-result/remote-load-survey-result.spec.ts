import { RemoteLoadSurveyResult } from "@/data/usecases";
import { HttpGetClientSpy } from "@/tests/database/mocks";

describe("RemoteLoadSurveyResult Usecase", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = "any_url";
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
