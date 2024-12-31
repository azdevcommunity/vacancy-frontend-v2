'use client'

import { useState, useMemo } from 'react'
import { mockCandidates, Candidate } from '../datas/mockData'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, DownloadIcon } from "@radix-ui/react-icons"
import { BriefcaseIcon, MailIcon, MapPinIcon, PhoneIcon, XIcon } from 'lucide-react'

export default function CandidatesScreen() {
    const [candidates] = useState<Candidate[]>(mockCandidates)
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(candidates.length > 0 ? candidates[4] : null)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

    const filteredCandidates = useMemo(() => {
        return candidates
            .filter(candidate =>
                candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                candidate.appliedJob.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortOrder === 'asc') {
                    return new Date(a.applicationDate).getTime() - new Date(b.applicationDate).getTime()
                } else {
                    return new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
                }
            })
    }, [candidates, searchTerm, sortOrder])

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            <div className="w-full md:w-1/3 p-4 bg-white shadow-md overflow-y-auto">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <SortOrder sortOrder={sortOrder} setSortOrder={setSortOrder} />
                <CandidatesList
                    candidates={filteredCandidates}
                    setSelectedCandidate={setSelectedCandidate}
                    selectedCandidate={selectedCandidate}
                />
            </div>
            <div className="w-full md:w-2/3 p-4 overflow-y-auto">
                {selectedCandidate && (
                    <div className="md:hidden mb-4">
                        <Button onClick={() => setSelectedCandidate(null)} variant="outline" size="sm">
                            <XIcon className="h-4 w-4 mr-2" />
                            Back to List
                        </Button>
                    </div>
                )}
                {selectedCandidate && <CandidateDetails candidate={selectedCandidate} />}
            </div>
        </div>
    )
}

function SearchBar({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (term: string) => void }) {
    return (
        <Input
            type="text"
            placeholder="Search by name or job posting number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
        />
    )
}

function SortOrder({setSortOrder }: { sortOrder: 'asc' | 'desc', setSortOrder: (order: 'asc' | 'desc') => void }) {
    return (
        <Select onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}>
            <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc">Newest first</SelectItem>
                <SelectItem value="asc">Oldest first</SelectItem>
            </SelectContent>
        </Select>
    )
}

function CandidatesList({ candidates, setSelectedCandidate, selectedCandidate }: { candidates: Candidate[], setSelectedCandidate: (candidate: Candidate) => void, selectedCandidate: Candidate | null }) {
    return (
        <div className="space-y-2">
            {candidates.map((candidate) => (
                <Card
                    key={candidate.id}
                    className={`cursor-pointer hover:bg-gray-100 ${
                        selectedCandidate?.id === candidate.id ? 'bg-blue-100 border-blue-500' : 'bg-white'
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                >
                    <CardContent className="p-4">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.appliedJob}</p>
                        <p className="text-xs text-gray-400">{candidate.applicationDate}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function CandidateDetails({ candidate }: { candidate: Candidate }) {
    return (
        <Card className="h-full overflow-hidden">
            <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{candidate.name}</h2>
                    <p className="text-base md:text-lg opacity-90">{candidate.appliedJob}</p>
                </div>
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 rounded-full p-2 md:p-3">
                            <CalendarIcon className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs md:text-sm text-gray-500">Application Date</p>
                            <p className="text-sm md:text-base font-semibold">{candidate.applicationDate}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-semibold">Candidate Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoItem icon={<MailIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />} label="Email" value={candidate.email} />
                            <InfoItem icon={<PhoneIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />} label="Phone" value={candidate.phone} />
                            <InfoItem icon={<MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />} label="Location" value={candidate.location} />
                            <InfoItem icon={<BriefcaseIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />} label="Experience" value={candidate.experience} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg md:text-xl font-semibold">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills?.map((skill, index) => (
                                <span key={index} className="bg-gray-100 text-gray-800 text-xs md:text-sm font-medium px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            )) || 'No skills listed'}
                        </div>
                    </div>
                    <div className="pt-4">
                        <Button asChild className="w-full">
                            <a href={candidate.cvFileUrl} download className="flex items-center justify-center">
                                <DownloadIcon className="mr-2 h-4 w-4" />
                                Download CV
                            </a>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | undefined }) {
    return (
        <div className="flex items-center space-x-3">
            {icon}
            <div>
                <p className="text-xs md:text-sm text-gray-500">{label}</p>
                <p className="text-sm md:text-base font-semibold">{value || 'Not provided'}</p>
            </div>
        </div>
    )
}