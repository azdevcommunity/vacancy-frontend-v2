'use client'

import { useState } from "react"
import { Filters } from "@/components/filters"
import { JobListItem } from "@/components/job-list-item"
import { JobDetails } from "@/components/job-details"
import {Job} from "@/types/job.ts";

// Sample data - in a real app this would come from an API
const sampleJobs: Job[] = [
    {
        id: "1",
        title: "Angular proqramçı",
        companyName: "PASHA Insurance",
        companyLogo: "/placeholder.svg",
        views: 14,
        postedAt: new Date(),
        isFavorite: false,
        grade: "mutaxəssis",
        type: "full-time",
        salary: "2000-5000",
        location: "Baku",
        postingType: "job postings",
        description: {
            duties: [
                "Layihələr üçün yeni komponentlərin hazırlanması, əlavə və dəyişikliklərin edilməsi",
                "Mövcud skriptlərdə dəyişikliklərin edilməsi və onların optimallaşdırılması",
                "Mövcud sistemlərə əlavələrin edilməsi və onların təkmilləşdirilməsi",
                "Proqram təminatının işinin optimallaşdırılması və performansının artırılması",
                "Yazılan kodların test edilməsi, yaranan problemlərin analizi və aradan qaldırılması",
                "Proqram təminatı istifadəçisindən daxil olan tələblərin təhlil edilməsi və problemlərin həll edilməsi",
                "Proqram layihələrinin hazırlanması üzrə texniki normaların, standartların və tələblərin müəyyənləşdirilməsinə dair təkliflərin hazırlanmasında iştirak etmək",
                "Vəzifəsi üzrə rəhbəri tərəfindən verilən tapşırıqları yerinə yetirmək"
            ],
            education: [
                "Kompüter mühəndisliyi və ya bənzəri ixtisasa dair ali təhsili olanlara üstünlük verilir"
            ],
            experience: [
                "Minimum 2 il müvafiq sahədə"
            ],
            requiredSkills: [
                "HTML/CSS, Javascript, Typescript üzrə dərin biliklər",
                "Frontend frameworklarından birində (Angular, React, Vue) yaxşı bilik",
                "Məntiqi və analitik düşüncə tərzi və təşəbbüskarlıq",
                "REST API ilə iş təcrübəsi",
                "Bootstrap, Material Design üzrə biliklər",
                "Package managerlərdən (npm, yarn) istifadə",
                "Gulp, Webpack üzrə xidmətlər",
                "Git/TFS bilikləri"
            ],
            preferredSkills: [
                "Angular, NGRX üzrə dərin biliklər",
                "Unit Testing bacarıqları",
                "Backend təcrübəsi"
            ]
        },
        applicationDeadline: new Date('2024-12-27'),
        category: "IT",
        schedule: "fixed",
    },
    // Add more sample jobs as needed
]

export default function VacanciesPage() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(sampleJobs[0])
    const [, setFavorites] = useState<Set<string>>(new Set())
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs)

    const handleFilterChange = (key: string, value: string) => {
        setFilteredJobs(sampleJobs.filter(job => {
            switch (key) {
                case "location":
                    return job.location.toLowerCase() === value.toLowerCase()
                case "category":
                    return job.category.toLowerCase() === value.toLowerCase()
                case "minSalary":
                    return parseInt(job.salary.split('-')[0]) >= parseInt(value)
                case "maxSalary":
                    return parseInt(job.salary.split('-')[1]) <= parseInt(value)
                case "jobType":
                    return job.type.toLowerCase() === value.toLowerCase()
                case "schedule":
                    return job.schedule.toLowerCase() === value.toLowerCase()
                case "postingDate":
                    { const daysSincePosted = (new Date().getTime() - job.postedAt.getTime()) / (1000 * 3600 * 24)
                    if (value === "last-week") return daysSincePosted <= 7
                    if (value === "last-month") return daysSincePosted <= 30
                    if (value === "new") return daysSincePosted <= 3
                    return true }
                default:
                    return true
            }
        }))
    }

    const handleToggleFavorite = (jobId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev)
            if (newFavorites.has(jobId)) {
                newFavorites.delete(jobId)
            } else {
                newFavorites.add(jobId)
            }
            return newFavorites
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Filters */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-4">
                    <Filters onFilterChange={handleFilterChange} />
                </div>
            </div>

            {/* Main content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Job listings */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="divide-y">
                            {filteredJobs.map((job) => (
                                <JobListItem
                                    key={job.id}
                                    job={job}
                                    isSelected={selectedJob?.id === job.id}
                                    onSelect={setSelectedJob}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Job details */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        {selectedJob && <JobDetails job={selectedJob} />}
                    </div>
                </div>
            </main>
        </div>
    )
}

