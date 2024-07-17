/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // update
  collection.schema.addField(new SchemaField({
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
        "overweight",
        "underweight",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
