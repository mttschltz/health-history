import { client } from "$lib/pocketbase";
import type {
  PersonConditionResponse,
  PersonLifestyleResponse,
  PersonResponse,
} from "$lib/pocketbase/generated-types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params, fetch, parent }) => {
  // ---
  // Person
  // ---
  //
  // 'slug' comes from the request param, i.e. folder name '[slug]'. It should
  // be [id].
  const { slug } = params;
  const filter = client.filter("id = {:slug}", { slug });
  const personCollection = client.collection("person");
  const options = {
    fetch,
    expand: "birthMother,birthFather",
  };
  const person = await personCollection.getFirstListItem<
    PersonResponse<PersonExpand>
  >(filter, options);

  // ---
  // Siblings
  // ---
  const siblings = await personCollection.getFullList<PersonResponse>({
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

  // ---
  // Lifestyle
  // ---
  const lifestyleCollection = client.collection("person_lifestyle");
  const lifestyles =
    await lifestyleCollection.getFullList<PersonLifestyleResponse>({
      filter: client.filter("person = {:id}", {
        id: person.id,
      }),
    });

  // ---
  // Conditions
  // ---
  const conditionCollection = client.collection("person_condition");
  const conditions =
    await conditionCollection.getFullList<PersonConditionResponse>({
      filter: client.filter("person = {:id}", {
        id: person.id,
      }),
    });

  // ---
  // Other
  // ---
  const { metadata } = await parent();
  metadata.title = metadata.headline = `${person.fullName}'s family`;

  return {
    conditions,
    lifestyles,
    person,
    siblings,
    title: person.fullName,
  };
};
