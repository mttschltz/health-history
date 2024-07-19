/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Auditlog = "auditlog",
	Person = "person",
	PersonCondition = "person_condition",
	PersonLifestyle = "person_lifestyle",
	Posts = "posts",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuditlogRecord<Tdata = unknown, Toriginal = unknown> = {
	admin?: string
	collection: string
	data?: null | Tdata
	event: string
	original?: null | Toriginal
	record: string
	user?: RecordIdString
}

export enum PersonSexOptions {
	"Male" = "Male",
	"Female" = "Female",
}
export type PersonRecord = {
	Sex?: PersonSexOptions
	birthFather?: RecordIdString
	birthMother?: RecordIdString
	birthYear?: number
	deathAge?: number
	deathYear?: number
	ethnicity?: string
	files?: string[]
	fullName: string
	notes?: HTMLString
}

export enum PersonConditionConditionOptions {
	"asthma" = "asthma",
	"birth-defect" = "birth-defect",
	"diabetes-type-1" = "diabetes-type-1",
	"diabetes-type-2" = "diabetes-type-2",
	"genetic-disorder" = "genetic-disorder",
	"heart-disease" = "heart-disease",
	"heart-attack" = "heart-attack",
	"high-blood-pressure" = "high-blood-pressure",
	"high-cholesterol" = "high-cholesterol",
	"mental-illness" = "mental-illness",
	"osteoporosis" = "osteoporosis",
	"cancer" = "cancer",
	"stillbirth-miscarriage" = "stillbirth-miscarriage",
	"stroke" = "stroke",
	"other" = "other",
}
export type PersonConditionRecord = {
	condition: PersonConditionConditionOptions
	details?: HTMLString
	files?: string[]
	person: RecordIdString
	type?: string
}

export enum PersonLifestyleLifestyleOptions {
	"smoking" = "smoking",
	"alcohol" = "alcohol",
	"drugs" = "drugs",
	"job" = "job",
	"weight" = "weight",
	"other" = "other",
}
export type PersonLifestyleRecord = {
	details?: HTMLString
	files?: string[]
	lifestyle: PersonLifestyleLifestyleOptions
	person: RecordIdString
}

export type PostsRecord = {
	body: string
	files?: string[]
	slug: string
	title: string
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuditlogResponse<Tdata = unknown, Toriginal = unknown, Texpand = unknown> = Required<AuditlogRecord<Tdata, Toriginal>> & BaseSystemFields<Texpand>
export type PersonResponse<Texpand = unknown> = Required<PersonRecord> & BaseSystemFields<Texpand>
export type PersonConditionResponse<Texpand = unknown> = Required<PersonConditionRecord> & BaseSystemFields<Texpand>
export type PersonLifestyleResponse<Texpand = unknown> = Required<PersonLifestyleRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	auditlog: AuditlogRecord
	person: PersonRecord
	person_condition: PersonConditionRecord
	person_lifestyle: PersonLifestyleRecord
	posts: PostsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	auditlog: AuditlogResponse
	person: PersonResponse
	person_condition: PersonConditionResponse
	person_lifestyle: PersonLifestyleResponse
	posts: PostsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'auditlog'): RecordService<AuditlogResponse>
	collection(idOrName: 'person'): RecordService<PersonResponse>
	collection(idOrName: 'person_condition'): RecordService<PersonConditionResponse>
	collection(idOrName: 'person_lifestyle'): RecordService<PersonLifestyleResponse>
	collection(idOrName: 'posts'): RecordService<PostsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
