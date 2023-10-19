import { Schema, model } from 'mongoose'
import { JobType } from '../types/JobType'

const JobSchema = new Schema<JobType>({
    title: { type: String, required: true },
    salary: { type: Number, required: true },
    city: { type: String, required: true },
    jobUrl: { type: String, required: true },
    technologies: { type: [String], required: true },
    company: { type: String, required: true },
    jobDescription: { type: String, required: true },
    siteLink: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

export const Job = model('Job', JobSchema)
