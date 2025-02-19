// src/models/resume.schema.ts
import { z } from "zod";

export const resumeSchema = z.object({
    basics: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string().optional(),
        url: z.string().url().optional(),
        location: z
            .object({
                address: z.string(),
                postalCode: z.string(),
                city: z.string(),
                countryCode: z.string(),
                region: z.string(),
            })
            .optional(),
        profiles: z
            .array(
                z.object({
                    network: z.string(),
                    username: z.string(),
                    url: z.string().url(),
                })
            )
            .optional(),
    }),
    education: z
        .array(
            z.object({
                institution: z.string(),
                studyType: z.string().optional(),
                area: z.string().optional(),
                startDate: z.coerce.date(),
                endDate: z.coerce.date().optional(),
                score: z.number().optional(),
            })
        )
        .optional(),
    skills: z
        .array(
            z.object({
                name: z.string(),
                level: z.string(),
                keywords: z.array(z.string()),
            })
        )
        .optional(),
    projects: z
        .array(
            z.object({
                name: z.string(),
                startDate: z.coerce.date(),
                endDate: z.coerce.date(),
                description: z.string(),
                highlights: z.array(z.string()).optional(),
                url: z.string().url().optional(),
            })
        )
        .optional(),
    work: z
        .array(
            z.object({
                companyName: z.string(),
                position: z.string(),
                startDate: z.coerce.date(),
                endDate: z.coerce.date(),
                summary: z.string(),
            })
        )
        .optional(),
    awards: z
        .array(
            z.object({
                title: z.string(),
                date: z.coerce.date().optional(),
                awarder: z.string().optional(),
                summary: z.string().optional(),
            })
        )
        .optional(),
});
