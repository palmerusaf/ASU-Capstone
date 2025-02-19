import { storage } from "wxt/storage";
import { ResumeRequest } from "@/src/models/resume.request.ts";
import {resumeSchema} from "@/src/models/resume.schema.ts";
import { RESUME_STORAGE_KEY } from "@/utils/constants/local.storage.constants.ts";

export async function createResume(data: ResumeRequest): Promise<ResumeRequest> {
    const validatedResume = resumeSchema.parse(data);
    const resumes = await getResumes();
    await storage.set(RESUME_STORAGE_KEY, [...resumes, validatedResume]); // TO-DO: Check whether to overwrite latest or keep all resumes
    return validatedResume; // TO-DO: Check whether to return here or not (leave for testing)
}

export async function getResumes(): Promise<ResumeRequest[]> {
    return (await storage.getItem(RESUME_STORAGE_KEY)) || [];
}

export async function main() {
    const testRequest: ResumeRequest = {
        basics: {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "555-1234",
            url: "https://janedoe.dev",
            location: {
                address: "123 Main St",
                postalCode: "94101",
                city: "San Francisco",
                countryCode: "US",
                region: "California",
            },
            profiles: [
                {
                    network: "GitHub",
                    username: "janedoe",
                    url: "https://github.com/janedoe",
                },
                {
                    network: "LinkedIn",
                    username: "janedoe",
                    url: "https://linkedin.com/in/janedoe",
                }
            ],
        },
        education: [
            {
                institution: "State University",
                studyType: "Bachelor",
                area: "Computer Science",
                startDate: new Date("2017-09-01"),
                endDate: new Date("2021-06-01"),
                score: 3.8,
            }
        ],
        skills: [
            {
                name: "Web Development",
                level: "Advanced",
                keywords: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
            },
            {
                name: "Machine Learning",
                level: "Intermediate",
                keywords: ["Python", "TensorFlow", "Scikit-Learn"],
            }
        ],
        projects: [
            {
                name: "AI Chatbot",
                startDate: new Date("2019-01-01"),
                endDate: new Date("2021-01-01"),
                description: "Developed an AI-powered chatbot using Python and TensorFlow.",
                highlights: ["Won award at AIHacks 2016", "Implemented NLP model for chatbot"],
                url: "https://github.com/janedoe/chatbot",
            }
        ],
        work: [
            {
                companyName: "Tech Company",
                position: "Software Engineer",
                startDate: new Date("2021-01-01"),
                endDate: new Date("2022-12-31"),
                summary: "Developed REST APIs using Node.js and optimized database queries in PostgreSQL.",
            },
            {
                companyName: "Startup XYZ",
                position: "Intern",
                startDate: new Date("2020-06-01"),
                endDate: new Date("2020-08-31"),
                summary: "Built React front-end components and worked with Firebase backend.",
            }
        ],
        awards: [
            {
                title: "Best Innovator Award",
                date: new Date("2020-05-01"),
                awarder: "Tech Conference",
                summary: "Recognized for innovative contributions in AI development.",
            }
        ]
    };

    createResume(testRequest)
        .then((resume) => console.log("Validated and saved resume:", resume))
        .catch((error) => console.error("Validation failed:", error));  const allResumes = await getResumes();
    console.log("All stored resumes:", allResumes);
}

    main().catch(console.error);

// TO-DO: Add other methods below (update, export, etc.)