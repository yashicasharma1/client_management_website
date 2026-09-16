import { ClientStatus } from "@/lib/types";

const LABEL: Record<ClientStatus, string> = {
  active: "Active",
  onboarding: "Onboarding",
  paused: "Paused",
};

const DOT: Record<ClientStatus, string> = {
  active: "bg-teal",
  onboarding: "bg-amber",
  paused: "bg-inkfaint",
};

export default function StatusPill({ status }: { status: ClientStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status]}`} />
      {LABEL[status]}
    </span>
  );
}
