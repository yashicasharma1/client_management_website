"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteClientButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    setBusy(true);
    const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setBusy(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="border border-line px-3 py-1.5 text-xs text-inkfaint hover:border-rust hover:text-rust"
      >
        Delete
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-inkfaint">Remove this client?</span>
      <button
        onClick={handleDelete}
        disabled={busy}
        className="border border-rust px-3 py-1.5 text-xs text-rust hover:bg-rust hover:text-paper disabled:opacity-50"
      >
        {busy ? "Removing…" : "Confirm"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="text-xs text-inkfaint underline"
      >
        Cancel
      </button>
    </div>
  );
}
