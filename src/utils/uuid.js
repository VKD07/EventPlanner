// crypto.randomUUID() only exists in secure contexts (HTTPS, or the
// literal host "localhost") — visiting the dev server over plain HTTP
// via a LAN IP (e.g. testing on a phone) doesn't qualify, so it's
// undefined there. This falls back to a manual RFC 4122 v4 generator.
export function randomUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
