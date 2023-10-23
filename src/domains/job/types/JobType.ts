import mongoose, { ObjectId, Types } from "mongoose"

export type JobType = {
    title: string
    salary: number
    city: string
    jobUrl: string
    technologies: string[]
    company: string
    jobDescription: string
    siteLink: string
    user: mongoose.Schema.Types.ObjectId
}
export type JobTypeWithRefs = {
    title: string
    salary: number
    city: Types.ObjectId
    jobUrl: string
    technologies: Types.ObjectId[]
    company: string
    jobDescription: string
    siteLink: string
    user: ObjectId
} & Document

