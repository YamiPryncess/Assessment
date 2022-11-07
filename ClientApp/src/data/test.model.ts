import { Question } from "./question.model";
import { TestResult } from "./testResults.model";

export interface Test {
    id: number;
    createdDateTime: Date;
    name: string;
    questionsAsked: string;
    testResults: TestResult[];
    questions: Question[];
}