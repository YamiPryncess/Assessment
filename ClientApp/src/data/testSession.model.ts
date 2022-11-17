import { Candidate } from "./candidate.model"
import { Test } from "./test.model"

export interface TestSession {
    id: number;
    createdDateTime: Date;
    name: string;
    questionsAsked: number;
}