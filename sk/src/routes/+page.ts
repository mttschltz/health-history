import { client, watch } from "$lib/pocketbase";
import type { PersonResponse } from "$lib/pocketbase/generated-types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, fetch }) => {
  const queryParams = {
    fetch,
  };
  const people = await watch<PersonResponse<any>>("person", queryParams);
  const { metadata } = await parent();
  return {
    metadata,
    people,
  };
};
