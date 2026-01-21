export interface CreateMasterDto {
  userId: string;
  address?: string;
  shortBio?: string;
  longBio?: string;
  careerStartYear: number;
  educationBio?: string;
  workStyleBio?: string;
  workFormats: WorkFormat[];
  onboardingStep: OnboardingStep;
  city: string;
}

export const workFormat = {
  VISIT: "VISIT",
  PLACE: "PLACE",
} as const;

type WorkFormat = (typeof workFormat)[keyof typeof workFormat];

export const onboardingStep = {
  BASE: "BASE",
  WORKPLACE: "WORKPLACE",
  ABOUT: "ABOUT",
  RULES: "RULES",
} as const;

type OnboardingStep = (typeof onboardingStep)[keyof typeof onboardingStep];

export interface UpdateMasterDto extends Partial<Omit<CreateMasterDto, "userId">> {
  onboardingStep: OnboardingStep;
}
