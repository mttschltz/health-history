/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dw1ixbesjp0f9xv",
    "created": "2024-07-19 03:05:51.048Z",
    "updated": "2024-07-19 03:05:51.048Z",
    "name": "person_lifestyle",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tevks6ww",
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
        "id": "rsvadh3i",
        "name": "lifestyle",
        "type": "select",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "smoking",
            "alcohol",
            "drugs",
            "job",
            "weight",
            "other"
          ]
        }
      },
      {
        "system": false,
        "id": "dj3fkjvf",
        "name": "details",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "2jrsw1qw",
        "name": "field",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 99,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "@request.auth.id != \"\"",
    "updateRule": "@request.auth.id != \"\"",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dw1ixbesjp0f9xv");

  return dao.deleteCollection(collection);
})
