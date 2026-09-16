export type SocialPlatform =
  | "Instagram"
  | "Facebook"
  | "LinkedIn"
  | "X"
  | "YouTube"
  | "TikTok"
  | "Pinterest"
  | "Threads"
  | "Website";

export type SocialHandle = {
  platform: SocialPlatform;
  handle: string;
  url: string;
};

export type Reporting = {
  ga4: { propertyId: string; url: string };
  clarity: { projectId: string; url: string };
  searchConsole: { propertyUrl: string; url: string };
};

export type ClientStatus = "active" | "onboarding" | "paused";

export type Client = {
  id: string;
  name: string;
  industry: string;
  status: ClientStatus;
  primaryContact: string;
  socials: SocialHandle[];
  reporting: Reporting;
  notes: string;
  updatedAt: string;
};

export const emptyReporting: Reporting = {
  ga4: { propertyId: "", url: "" },
  clarity: { projectId: "", url: "" },
  searchConsole: { propertyUrl: "", url: "" },
};

export const socialPlatforms: SocialPlatform[] = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "X",
  "YouTube",
  "TikTok",
  "Pinterest",
  "Threads",
  "Website",
];
