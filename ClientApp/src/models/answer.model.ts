import { Question } from "./question.model";
import { Session } from "./session.model";

export interface Answer {
    id: number;
    createdDateTime: Date;

    questionId: number;
    question: Question;
    sessionId: number;
    session: Session;

    text: string;
    score: number;
}