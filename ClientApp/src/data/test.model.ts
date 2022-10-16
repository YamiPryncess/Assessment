import { TestResult } from "./testResults.model";

export interface Test {
    "id": number,
    "createdDateTime": Date,
    "questionsAsked": string,
    "testResults": TestResult[]
}