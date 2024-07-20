import type { LayoutLoad } from "./$types";
import { client } from "$lib/pocketbase";
import { alerts } from "$lib/components/Alerts.svelte";
import { toast } from "@zerodevx/svelte-toast";
import { alertError } from "$lib/components/alert";

// turn off SSR - we're JAMstack here
export const ssr = false;
// Prerendering turned off. Turn it on if you know what you're doing.
export const prerender = false;
// trailing slashes make relative paths much easier
export const trailingSlash = "always";

export const load: LayoutLoad = async ({ fetch }) => {
  type Metadata = {
    title: string;
    headline?: string;
  };
  let config: {
    site: {
      name: string;
      copyright: string;
      year: number;
    };
    signupAllowed: boolean;
  } = {} as any;
  const title = "Untitled";
  const metadata: Metadata = {
    title,
  };

  try {
    const response = await fetch(client.baseUrl + "/_/");
    if (response.redirected) {
      alertError(
        "Please visit <host:port>/_/ to finalize installation of PocketBase"
      );
    }

    config = await client.send("/api/config", { fetch, requestKey: "config" });
  } catch (e: any) {
    alerts.error(e.toString());
  }
  return {
    config,
    metadata,
  };
};
