import { dev } from "$app/environment";

// Adds delay when in local environment to make loading bars etc.
// more visible.
export async function localDelay() {
  if (dev) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
