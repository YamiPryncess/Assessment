import { SessionStatus } from "src/enums/session-status.enum";
import { Candidate } from "./candidate.model"
import { Test } from "./test.model"

export interface TestSession {
    id: number;
    candidateId: number;
    testId: number;
    createdDateTime: Date;
    name: string;
    questionsAsked: number;
    status: SessionStatus;
}