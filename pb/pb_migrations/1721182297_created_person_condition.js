/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "qjsy00sojrp07ts",
    "created": "2024-07-17 02:11:37.464Z",
    "updated": "2024-07-17 02:11:37.464Z",
    "name": "person_condition",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "flsg78nl",
        "name": "person",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "1zp0krgfzaus89l",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "vvvincsv",
        "name": "condition",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "asthma",
            "birth-defect",
            "diabetes-type-1",
            "diabetes-type-2",
            "genetic-disorder",
            "heart-disease",
            "heart-attack",
            "high-blood-pressure",
            "high-cholesterol",
            "mental-illness",
            "osteoporosis",
            "cancer",
            "stillbirth-miscarriage",
            "stroke",
            "other"
          ]
        }
      },
      {
        "system": false,
        "id": "j0w1i3g1",
        "name": "type",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fucsyca1",
        "name": "details",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts");

  return dao.deleteCollection(collection);
})
