import { Candidate } from "./candidate.model"
import { Test } from "./test.model"

export interface Session {
    id: number;
    createdDateTime: Date;
    testId: number;
    candidateId: number;
    status: TestStatus;
    startTime: Date;
    endTime: Date;
    endMethod: string;
    score: number;
    questionsAnswered: number;
    test: Test;
    candidate: Candidate;
}

enum TestStatus {
    Assigned,
    Started,
    Finished
}