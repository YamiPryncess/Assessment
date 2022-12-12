import { SessionStatus } from "src/enums/session-status.enum";
import { Candidate } from "./candidate.model";
import { Test } from "./test.model";
import { DateTime } from "luxon";

export interface TestSession {
    id: number;
    guid: string;
    candidateId: number;
    testId: number;
    createdDateTime: DateTime;
    name: string;
    questionsAsked: number;
    status: SessionStatus;
}