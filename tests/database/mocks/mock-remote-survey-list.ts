import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: "any_id",
  question: "any_question",
  didAnswer: false,
  date: new Date().toISOString(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
