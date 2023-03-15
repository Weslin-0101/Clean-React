import { LoadSurveyList } from "../usecases/load-survey-list";

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: "any_id",
  question: "any_question",
  didAnswer: false,
  date: new Date(),
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
];
