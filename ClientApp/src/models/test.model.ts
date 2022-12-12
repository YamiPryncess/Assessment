import { Question } from "./question.model";
import { Session } from "./session.model";
import { DateTime } from "luxon";

export interface Test {
    id: number;
    createdDateTime: DateTime;
    name: string;
    questionsAsked: string;
    minutes: number;
    sessions: Session[];
    questions: Question[];
}