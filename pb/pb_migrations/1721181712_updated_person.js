/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zn4g1h6g",
    "name": "birthMother",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1zp0krgfzaus89l",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "spgogtpx",
    "name": "birthFather",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1zp0krgfzaus89l",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  // remove
  collection.schema.removeField("zn4g1h6g")

  // remove
  collection.schema.removeField("spgogtpx")

  return dao.saveCollection(collection)
})
