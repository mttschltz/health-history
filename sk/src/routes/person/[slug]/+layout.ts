import { client } from "$lib/pocketbase";
import type {
  PersonResponse,
  PostsRecord,
  PostsResponse,
} from "$lib/pocketbase/generated-types";
import type exp from "constants";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, fetch, parent }) => {
  const { slug } = params;
  const filter = client.filter("id = {:slug}", { slug });
  const coll = client.collection("person");
  const options = {
    fetch,
    expand: "birthMother,birthFather",
  };
  const person = await coll.getFirstListItem<PersonResponse<PersonExpand>>(
    filter,
    options
  );
  const siblings = await coll.getFullList<PersonResponse>({
    filter: client.filter(
      "id != {:id} && ((birthMother != '' && birthMother={:birthMother}) || (birthFather != '' && birthFather={:birthFather}))",
      {
        id: person.id,
        birthMother: person.birthMother,
        birthFather: person.birthFather,
      }
    ),
  });
  siblings.sort((a, b) => a.birthYear - b.birthYear);

  const { metadata } = await parent();
  metadata.title = metadata.headline = `${person.fullName}'s family`;

  console.log(`xyz person page title: ${person.fullName}`);

  return {
    title: person.fullName,
    person,
    siblings,
  };
};
