/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dw1ixbesjp0f9xv")

  // remove
  collection.schema.removeField("dj3fkjvf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e57kyslp",
    "name": "details",
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
  const collection = dao.findCollectionByNameOrId("dw1ixbesjp0f9xv")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("e57kyslp")

  return dao.saveCollection(collection)
})
