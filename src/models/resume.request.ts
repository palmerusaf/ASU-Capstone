// TO-DO: Determine Required vs. Optional Fields when adding Front-End
export interface ResumeRequest {
    basics: {
        name: string;
        email: string;
        phone?: string;
        url?: string;
        location?: {
            address: string;
            postalCode: string;
            city: string;
            countryCode: string;
            region: string;
        };
        profiles?: Array<{
            network: string;
            username: string;
            url: string;
        }>;
    };
    education?: Array<{
        institution: string;
        studyType?: string;
        area?: string;
        startDate: Date;
        endDate?: Date;
        score?: number;
    }>;
    skills?: Array<{
        name: string;
        level: string;
        keywords: string[];
    }>;
    projects?: Array<{
        name: string;
        startDate: Date;
        endDate: Date;
        description: string;
        highlights?: string[];
        url?: string;
    }>;
    work?: Array<{
        companyName: string;
        position: string;
        startDate: Date;
        endDate: Date;
        summary: string;
    }>;
    awards?: Array<{
        title: string;
        date?: Date;
        awarder?: string;
        summary?: string;
    }>;
}