import { Question } from "./question.model";
import { Session } from "./session.model";
import { DateTime } from "luxon";

export interface Answer {
    id: number;
    createdDateTime: DateTime;

    questionId: number;
    question: Question;
    sessionId: number;
    session: Session;

    text: string;
    score: number;
}