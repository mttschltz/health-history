/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikcf2tql",
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
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // remove
  collection.schema.removeField("ikcf2tql")

  return dao.saveCollection(collection)
})
