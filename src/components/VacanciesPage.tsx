'use client'

import {useState} from "react"
import {Job} from "@/types/job"
import {Filters} from "@/components/filters"
import {JobListItem} from "@/components/job-list-item"
import {JobDetails} from "@/components/job-details"

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
        type: "Full",
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
        category: "Kompüterləşmə və İKT"
    },
    // Add more sample jobs as needed
]

export default function VacanciesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedJob, setSelectedJob] = useState<Job | null>(sampleJobs[0])
    const [favorites, setFavorites] = useState<Set<string>>(new Set())

    const handleFilterChange = (key: string, value: string) => {
        // Implement filtering logic here
        console.log(`Filter changed: ${key} = ${value}`)
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
                    <Filters onFilterChange={handleFilterChange}/>
                </div>
            </div>

            {/* Main content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Job listings */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="divide-y">
                            {sampleJobs.map((job) => (
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
                        {selectedJob && <JobDetails job={selectedJob}/>}
                    </div>
                </div>
            </main>
        </div>
    )
}

