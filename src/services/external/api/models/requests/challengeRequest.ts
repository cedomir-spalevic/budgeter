import { ChallengeType } from "../data/challenge";

export interface ChallengeRequest {
   email?: string;
   phoneNumber?: string;
   type: ChallengeType;
}
