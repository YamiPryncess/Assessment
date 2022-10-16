import { Candidate } from "./candidate.model"
import { Test } from "./test.model"

export interface TestResult {
    "id": number,
    "createdDateTime": Date,
    "testId": number,
    "candidateId": number,
    "startTime": Date,
    "endTime": Date,
    "endMethod": string,
    "score": number,
    "questionsAnswered": number
    "test": Test,
    "candidate": Candidate
}