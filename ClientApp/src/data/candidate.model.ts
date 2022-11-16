import { Session } from "./session.model";

export interface Candidate {
    id: number;
    createdDateTime: Date;
    firstName: string;
    lastName: string;
    ssn: string;
    dob: Date;
    email: string;
    source1: string;
    source2: string;
    desiredJobTitle: string;
    backgroundCheckAuthorizationTimestampET: Date;
    backGroundCheckLevel: string;
    driversLicenseState: string;
    driversLicenseNumber: string;
    status: string;
    createdBy: string;
    sessions: Session[];
}