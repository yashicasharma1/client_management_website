import fs from "fs";
import path from "path";
import { Client } from "./types";

export * from "./types";

const DATA_PATH = path.join(process.cwd(), "data", "clients.json");

function readAll(): Client[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Client[];
}

function writeAll(clients: Client[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(clients, null, 2) + "\n", "utf-8");
}

export function getClients(): Client[] {
  return readAll().sort((a, b) => a.name.localeCompare(b.name));
}

export function getClient(id: string): Client | undefined {
  return readAll().find((c) => c.id === id);
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function createClient(input: Omit<Client, "id" | "updatedAt">): Client {
  const clients = readAll();
  let base = slugify(input.name) || "client";
  let id = base;
  let n = 2;
  while (clients.some((c) => c.id === id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  const client: Client = { ...input, id, updatedAt: new Date().toISOString() };
  clients.push(client);
  writeAll(clients);
  return client;
}

export function updateClient(
  id: string,
  input: Partial<Omit<Client, "id">>
): Client | undefined {
  const clients = readAll();
  const idx = clients.findIndex((c) => c.id === id);
  if (idx === -1) return undefined;
  clients[idx] = { ...clients[idx], ...input, updatedAt: new Date().toISOString() };
  writeAll(clients);
  return clients[idx];
}

export function deleteClient(id: string): boolean {
  const clients = readAll();
  const next = clients.filter((c) => c.id !== id);
  if (next.length === clients.length) return false;
  writeAll(next);
  return true;
}
