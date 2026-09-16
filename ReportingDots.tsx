import { Reporting } from "@/lib/types";

function isConnected(value: string): boolean {
  return value.trim().length > 0;
}

export default function ReportingDots({ reporting }: { reporting: Reporting }) {
  const items: { label: string; on: boolean }[] = [
    { label: "GA4", on: isConnected(reporting.ga4.propertyId) },
    { label: "CLR", on: isConnected(reporting.clarity.projectId) },
    { label: "GSC", on: isConnected(reporting.searchConsole.propertyUrl) },
  ];

  return (
    <div className="flex items-center gap-2 font-mono text-[11px]">
      {items.map((item) => (
        <span
          key={item.label}
          className={
            item.on
              ? "border border-teal px-1.5 py-0.5 text-teal"
              : "border border-line px-1.5 py-0.5 text-inkfaint"
          }
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}
