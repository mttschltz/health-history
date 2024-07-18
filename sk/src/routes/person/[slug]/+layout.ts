import { client } from "$lib/pocketbase";
import type {
  PersonResponse,
  PostsRecord,
  PostsResponse,
} from "$lib/pocketbase/generated-types";
import type exp from "constants";
import type { LayoutLoad } from "./$types";

type PersonExpand = {
  birthMother: PersonResponse;
  birthFather: PersonResponse;
};

export const load: LayoutLoad = async ({ params, fetch, parent }) => {
  const { slug } = params;
  const filter = client.filter("id = {:slug}", { slug });
  const coll = client.collection("person");
  const options = { fetch, expand: "birthMother,birthFather" };
  const record = await coll.getFirstListItem<PersonResponse<PersonExpand>>(
    filter,
    options
  );

  const { metadata } = await parent();
  metadata.title = metadata.headline = `${record.fullName}'s family`;

  return {
    record,
  };
};
