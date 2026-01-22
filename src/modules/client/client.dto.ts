export interface CreateClientDto {
  city: string;
}

export const onboardingStep = {
  BASE: "BASE",
  INTERESTS: "INTERESTS",
} as const;

type OnboardingStep = (typeof onboardingStep)[keyof typeof onboardingStep];

export interface UpdateClientDto extends Partial<Omit<CreateClientDto, "userId">> {
  onboardingStep: OnboardingStep;
}
