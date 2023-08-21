import { Session } from "./session.model";
import {CandidateStatus} from "../enums/candidate-status.enum";

export interface Candidate {
    id: number;
    createdDateTime: string;
    firstName: string;
    lastName: string;
    ssn: string;
    dob: string;
    email: string;
    source1: string;
    source2: string;
    desiredJobTitle: string;
    backgroundCheckAuthorizationTimestampET: string;
    backGroundCheckLevel: string;
    driversLicenseState: string;
    driversLicenseNumber: string;
    status: CandidateStatus;
    createdBy: string;
    sessions: Session[];
}
