import { client, watch } from "$lib/pocketbase";
import type { PersonResponse } from "$lib/pocketbase/generated-types";
import type { PageLoad } from "./$types";
import { base } from "$app/paths";

export const load: PageLoad = async ({ parent, fetch }) => {
  const queryParams = {
    fetch,
  };
  const { person } = await parent();

  return {
    back: `${base}/person/${person.id}`,
    title: `${person.fullName}'s Health History`,
  };
};
