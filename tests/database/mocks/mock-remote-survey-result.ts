import { RemoteLoadSurveyResult } from "@/data/usecases";

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: "any_question",
    date: new Date().toISOString(),
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false,
      },
      {
        image: "other_image",
        answer: "other_answer",
        count: 10,
        percent: 50,
        isCurrentAccountAnswer: true,
      },
    ],
  });
