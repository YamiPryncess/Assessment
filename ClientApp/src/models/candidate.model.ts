import { Session } from "./session.model";
import { DateTime } from "luxon";

export interface Candidate {
    id: number;
    createdDateTime: DateTime;
    firstName: string;
    lastName: string;
    ssn: string;
    dob: DateTime;
    email: string;
    source1: string;
    source2: string;
    desiredJobTitle: string;
    backgroundCheckAuthorizationTimestampET: DateTime;
    backGroundCheckLevel: string;
    driversLicenseState: string;
    driversLicenseNumber: string;
    status: string;
    createdBy: string;
    sessions: Session[];
}