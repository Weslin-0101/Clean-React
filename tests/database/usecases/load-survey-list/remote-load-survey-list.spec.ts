import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";
import { HttpGetClientSpy } from "@/tests/database/mocks";

describe("RemoteLoadSurveyList", () => {
  test("Should call HttpGetClient with correct URL", async () => {
    const url = "any_url";
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
