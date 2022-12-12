import { Test } from "./test.model";
import { DateTime } from "luxon";

export interface Question {
    id: number;
    createdDateTime: DateTime;
    testId: number;
    test: Test;
    text: string;
    image: string;
    index: number;
}