/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // remove
  collection.schema.removeField("tkkqhlxj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gjdmifs6",
    "name": "notes",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tkkqhlxj",
    "name": "notes",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("gjdmifs6")

  return dao.saveCollection(collection)
})
