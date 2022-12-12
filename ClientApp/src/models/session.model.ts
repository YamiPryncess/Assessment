import { EndingMethod } from "src/enums/ending-method.enum";
import { SessionStatus } from "src/enums/session-status.enum";
import { Answer } from "./answer.model";
import { Candidate } from "./candidate.model";
import { Test } from "./test.model";
import { DateTime } from "luxon";

export interface Session {
    id: number;
    guid: string;
    createdDateTime: DateTime;
    testId: number;
    candidateId: number;
    status: SessionStatus;
    startTime: DateTime;
    endTime: DateTime;
    endMethod: EndingMethod;
    score: number;
    questionsAnswered: number;
    test: Test;
    candidate: Candidate;
    answers: Answer[];
}