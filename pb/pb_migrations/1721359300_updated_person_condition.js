/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zembtull",
    "name": "files",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // remove
  collection.schema.removeField("zembtull")

  return dao.saveCollection(collection)
})
