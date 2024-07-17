/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "1zp0krgfzaus89l",
    "created": "2024-07-17 01:56:59.879Z",
    "updated": "2024-07-17 01:56:59.879Z",
    "name": "person",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wyl0umdp",
        "name": "fullName",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "kdhlvbls",
        "name": "Sex",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "Male",
            "Female"
          ]
        }
      },
      {
        "system": false,
        "id": "kbnnvmki",
        "name": "birthYear",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "3xxhczpm",
        "name": "deathYear",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "mnvios5o",
        "name": "deathAge",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "dxqqofl1",
        "name": "ethnicity",
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
        "id": "5wsj0ntv",
        "name": "lifestyleIssues",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 3,
          "values": [
            "smoking",
            "alcohol",
            "job",
            "other"
          ]
        }
      },
      {
        "system": false,
        "id": "tkkqhlxj",
        "name": "lifestyleIssueDetails",
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
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l");

  return dao.deleteCollection(collection);
})
