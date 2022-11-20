import { Question } from "./question.model";
import { Session } from "./session.model";

export interface Test {
    id: number;
    createdDateTime: Date;
    name: string;
    questionsAsked: string;
    minutes: number;
    sessions: Session[];
    questions: Question[];
}