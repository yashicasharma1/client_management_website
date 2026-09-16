"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Client,
  ClientStatus,
  SocialHandle,
  SocialPlatform,
  emptyReporting,
  socialPlatforms,
} from "@/lib/types";

const inputClass =
  "w-full border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-inkfaint focus:border-teal";
const labelClass = "text-xs text-inkfaint";

export default function ClientForm({
  initial,
}: {
  initial?: Client;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [name, setName] = useState(initial?.name ?? "");
  const [industry, setIndustry] = useState(initial?.industry ?? "");
  const [status, setStatus] = useState<ClientStatus>(
    initial?.status ?? "onboarding"
  );
  const [primaryContact, setPrimaryContact] = useState(
    initial?.primaryContact ?? ""
  );
  const [socials, setSocials] = useState<SocialHandle[]>(
    initial?.socials ?? []
  );
  const [reporting, setReporting] = useState(
    initial?.reporting ?? emptyReporting
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function addSocial() {
    setSocials([...socials, { platform: "Instagram", handle: "", url: "" }]);
  }

  function updateSocial(i: number, patch: Partial<SocialHandle>) {
    setSocials(socials.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function removeSocial(i: number) {
    setSocials(socials.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Give the client a name.");
      return;
    }
    setBusy(true);

    const payload = {
      name: name.trim(),
      industry: industry.trim(),
      status,
      primaryContact: primaryContact.trim(),
      socials,
      reporting,
      notes,
    };

    const res = await fetch(
      isEdit ? `/api/clients/${initial!.id}` : "/api/clients",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setBusy(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Try again.");
      return;
    }

    const client = await res.json();
    router.push(`/clients/${client.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-10">
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Client name
          </label>
          <input
            id="name"
            className={`${inputClass} mt-1`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Verdant Home"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="industry">
            Industry / category
          </label>
          <input
            id="industry"
            className={`${inputClass} mt-1`}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Home & living, D2C"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            className={`${inputClass} mt-1`}
            value={status}
            onChange={(e) => setStatus(e.target.value as ClientStatus)}
          >
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="contact">
            Primary contact
          </label>
          <input
            id="contact"
            className={`${inputClass} mt-1`}
            value={primaryContact}
            onChange={(e) => setPrimaryContact(e.target.value)}
            placeholder="Name at the client's side"
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-ink">Social channels</h2>
          <button
            type="button"
            onClick={addSocial}
            className="text-xs text-teal underline decoration-line underline-offset-4"
          >
            + Add channel
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {socials.map((s, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-2 border border-line p-3 sm:grid-cols-[140px_1fr_1fr_auto] sm:items-center"
            >
              <select
                className={inputClass}
                value={s.platform}
                onChange={(e) =>
                  updateSocial(i, {
                    platform: e.target.value as SocialPlatform,
                  })
                }
              >
                {socialPlatforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                className={inputClass}
                value={s.handle}
                onChange={(e) => updateSocial(i, { handle: e.target.value })}
                placeholder="@handle"
              />
              <input
                className={inputClass}
                value={s.url}
                onChange={(e) => updateSocial(i, { url: e.target.value })}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => removeSocial(i)}
                className="justify-self-start text-xs text-inkfaint hover:text-rust sm:justify-self-center"
              >
                Remove
              </button>
            </div>
          ))}
          {socials.length === 0 ? (
            <p className="text-sm text-inkfaint">No channels added yet.</p>
          ) : null}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-medium text-ink">Reporting links</h2>
        <p className="mt-1 text-xs text-inkfaint">
          Paste the property ID or project ID from each platform, plus the
          direct dashboard link your team should open.
        </p>

        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className={labelClass}>GA4 property ID</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.ga4.propertyId}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    ga4: { ...reporting.ga4, propertyId: e.target.value },
                  })
                }
                placeholder="properties/123456789"
              />
            </div>
            <div>
              <label className={labelClass}>GA4 dashboard link</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.ga4.url}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    ga4: { ...reporting.ga4, url: e.target.value },
                  })
                }
                placeholder="https://analytics.google.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Clarity project ID</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.clarity.projectId}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    clarity: {
                      ...reporting.clarity,
                      projectId: e.target.value,
                    },
                  })
                }
                placeholder="e.g. abcd1234ef"
              />
            </div>
            <div>
              <label className={labelClass}>Clarity dashboard link</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.clarity.url}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    clarity: { ...reporting.clarity, url: e.target.value },
                  })
                }
                placeholder="https://clarity.microsoft.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Search Console property</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.searchConsole.propertyUrl}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    searchConsole: {
                      ...reporting.searchConsole,
                      propertyUrl: e.target.value,
                    },
                  })
                }
                placeholder="https://client-site.com"
              />
            </div>
            <div>
              <label className={labelClass}>Search Console dashboard link</label>
              <input
                className={`${inputClass} mt-1`}
                value={reporting.searchConsole.url}
                onChange={(e) =>
                  setReporting({
                    ...reporting,
                    searchConsole: {
                      ...reporting.searchConsole,
                      url: e.target.value,
                    },
                  })
                }
                placeholder="https://search.google.com/search-console"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <label className={labelClass} htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          className={`${inputClass} mt-1 min-h-[120px]`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything the team should know at a glance."
        />
      </section>

      {error ? <p className="text-sm text-rust">{error}</p> : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-ink bg-ink px-5 py-2 text-sm text-paper hover:bg-transparent hover:text-ink disabled:opacity-50"
        >
          {busy ? "Saving…" : isEdit ? "Save changes" : "Add client"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-inkfaint underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
