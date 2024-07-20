/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.writeAccess = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1zp0krgfzaus89l")

  collection.listRule = ""
  collection.viewRule = ""
  collection.updateRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
