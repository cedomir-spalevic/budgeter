import { ChallengeType } from "../data/challenge";

export interface ChallengeBody {
    email?: string;
    phoneNumber?: string;
    type: ChallengeType;
 }