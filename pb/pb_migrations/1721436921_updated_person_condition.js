/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvvincsv",
    "name": "condition",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "birth-defect",
        "diabetes-type-1",
        "diabetes-type-2",
        "genetic-disorder",
        "heart-disease",
        "heart-attack",
        "high-blood-pressure",
        "high-cholesterol",
        "mental-illness",
        "osteoporosis",
        "cancer",
        "stillbirth-miscarriage",
        "stroke",
        "lung",
        "neuro",
        "liver",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qjsy00sojrp07ts")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vvvincsv",
    "name": "condition",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "asthma",
        "birth-defect",
        "diabetes-type-1",
        "diabetes-type-2",
        "genetic-disorder",
        "heart-disease",
        "heart-attack",
        "high-blood-pressure",
        "high-cholesterol",
        "mental-illness",
        "osteoporosis",
        "cancer",
        "stillbirth-miscarriage",
        "stroke",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
