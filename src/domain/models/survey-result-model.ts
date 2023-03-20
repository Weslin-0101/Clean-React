export interface SurveyResultModel {
  question: string;
  answers: AnswerModel[];
  date: Date;
}

export type AnswerModel = {
  image?: string;
  answer: string;
  count: number;
  percent: number;
  isCurrentAccountAnswer: boolean;
};
