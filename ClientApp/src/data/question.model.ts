import { Test } from "./test.model"

export interface Question {
    id: number;
    createdDateTime: Date;
    testId: number;
    test: Test;
    text: string;
    image: string;
    index: number;
}