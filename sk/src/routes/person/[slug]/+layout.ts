import { client } from "$lib/pocketbase";
import type {
  PersonResponse,
  PostsRecord,
  PostsResponse,
} from "$lib/pocketbase/generated-types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, fetch }) => {
  const { slug } = params;
  const filter = client.filter("id = {:slug}", { slug });
  const coll = client.collection("person");
  const options = { fetch };
  const record = await coll.getFirstListItem<PersonResponse>(filter, options);
  return {
    record,
  };
};
