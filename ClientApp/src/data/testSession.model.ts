import { Candidate } from "./candidate.model"
import { TestStatus } from "./session.model";
import { Test } from "./test.model"

export interface TestSession {
    id: number;
    candidateId: number;
    testId: number;
    createdDateTime: Date;
    name: string;
    questionsAsked: number;
    status: TestStatus;
}