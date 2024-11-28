import { Heart } from 'lucide-react'
import { Job } from "@/types/job"
import { cn } from "@/lib/utils"
import {formatPostedDate, isNewPost} from "@/util/date.ts";

interface JobListItemProps {
    job: Job
    isSelected: boolean
    onSelect: (job: Job) => void
    onToggleFavorite: (jobId: string) => void
}

export function JobListItem({
                                job,
                                isSelected,
                                onSelect,
                                onToggleFavorite
                            }: JobListItemProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4 p-4 cursor-pointer border-b hover:bg-gray-50",
                isSelected && "bg-blue-50 hover:bg-blue-50"
            )}
            onClick={() => onSelect(job)}
        >
            <div className="relative flex-shrink-0">
                <img
                    src={job.companyLogo}
                    alt={`${job.companyName} logo`}
                    className="w-12 h-12 rounded-full"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleFavorite(job.id)
                    }}
                    className="absolute -top-2 -right-2 p-1 rounded-full bg-white shadow-sm"
                >
                    <Heart
                        className={cn(
                            "w-4 h-4",
                            job.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                        )}
                    />
                </button>
            </div>

            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{job.title}</h3>
                    {isNewPost(job.postedAt) && (
                        <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              YENİ
            </span>
                    )}
                </div>
                <p className="text-sm text-gray-600 truncate">{job.companyName}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>{job.views}</span>
                    <span>views</span>
                </div>
                <div className="text-sm text-gray-500">
                    {formatPostedDate(job.postedAt)}
                </div>
            </div>
        </div>
    )
}