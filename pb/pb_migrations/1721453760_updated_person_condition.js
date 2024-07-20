/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.writeAccess = true"
  collection.updateRule = "@request.auth.writeAccess = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
