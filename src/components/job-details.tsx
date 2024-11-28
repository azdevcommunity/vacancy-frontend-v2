import { Job } from "@/types/job"
import { Button } from "@/components/ui/button"

interface JobDetailsProps {
    job: Job
}

export function JobDetails({ job }: JobDetailsProps) {
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <p className="text-gray-600">{job.companyName}</p>
                    <p className="text-gray-600">{job.category}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-orange-600 border border-orange-200 rounded-full px-4 py-1">
                        Son tarix {job.applicationDeadline.toLocaleDateString('az-AZ', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <section>
                    <h2 className="text-lg font-semibold mb-3">Vəzifə və öhdəliklər:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {job.description.duties.map((duty, index) => (
                            <li key={index} className="text-gray-700">{duty}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-3">Təhsil və ixtisas tələbləri:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {job.description.education.map((req, index) => (
                            <li key={index} className="text-gray-700">{req}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-3">İş təcrübəsi:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {job.description.experience.map((exp, index) => (
                            <li key={index} className="text-gray-700">{exp}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-3">Bilik və bacarıqlar:</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">Tələb olunan:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {job.description.requiredSkills.map((skill, index) => (
                                    <li key={index} className="text-gray-700">{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Üstünlük verilir:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {job.description.preferredSkills.map((skill, index) => (
                                    <li key={index} className="text-gray-700">{skill}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <Button className="w-full" size="lg">
                Müraciət et
            </Button>
        </div>
    )
}
