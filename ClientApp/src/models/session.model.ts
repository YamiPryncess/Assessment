import { EndingMethod } from "src/enums/ending-method.enum";
import { SessionStatus } from "src/enums/session-status.enum";
import { Answer } from "./answer.model";
import { Candidate } from "./candidate.model"
import { Test } from "./test.model"

export interface Session {
    id: number;
    createdDateTime: Date;
    testId: number;
    candidateId: number;
    status: SessionStatus;
    startTime: Date;
    endTime: Date;
    endMethod: EndingMethod;
    score: number;
    questionsAnswered: number;
    test: Test;
    candidate: Candidate;
    answers: Answer[];
}