# Job App App

## Objective

Simplify the job/internship application process by automating search, application, and tracking of jobs. We seek to accomplish this by creating a desktop app that integrates with various jobs sites such as Handshake, LinkedIn, and Indeed.

## Description

This will be a desktop application that will retrieve job postings from multiple sites and consolidate them in one list. Here the user can filter and update the status of the jobs. This list will include metadata such as date added, date applied, as well as a score indicating how closely it matches the user's selected resume. If the job has an easy apply button then the user will be able to select and apply to multiple jobs at once.

This application will also include resume management. It will include an ATS compliant resume builder, downloader, and version management. The overall goal here is to help the applicant organize tailor made resumes with their respective jobs. This will be done partly through automation with keyword extraction and matching. Finally, we will include a tagging system to allow the user to further organize their jobs/resumes when automation is lacking.

## Contributing

Visit [CONTRIBUTING.md](./CONTRIBUTING.md) for guidance.

## Roadmaps

### Phase 1 - Semester 1 - Job Management

- [x] Link with one job site
- [ ] Upload/Extract Resume keywords
- [ ] Search/Add functionality
- [ ] Add job tagging system
- [ ] Job Tracker
- [ ] Schedule interviews/Integrate with ICal
- [ ] Auto apply bot
- [ ] Link and integrate with 1-2 more job sites

### Phase 2 - Semester 2 - Resume Management

- [ ] Resume builder
- [ ] Resume download
- [ ] Add resume tagging system
- [ ] Resume storage/management
- [ ] Resume to job matcher
- [ ] One click resume upload to job sites
- [ ] Fully integrate with job management

## Tech Stack

- electron-vite
- GitHub Actions for CD/CI
- React.js
- TailwindCSS
- Typescript
