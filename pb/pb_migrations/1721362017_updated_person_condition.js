/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // remove
  collection.schema.removeField("fucsyca1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wgzx05pb",
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
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("wgzx05pb")

  return dao.saveCollection(collection)
})
