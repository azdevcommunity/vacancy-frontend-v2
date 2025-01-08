import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FiltersProps {
    onFilterChange: (key: string, value: string) => void
}

export function Filters({ onFilterChange }: FiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select onValueChange={(value) => onFilterChange("location", value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Yer (Şəhər/Bölgə/Ölkə)" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="baku">Bakı</SelectItem>
                    <SelectItem value="ganja">Gəncə</SelectItem>
                    <SelectItem value="sumgait">Sumqayıt</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange("category", value)}>
                <SelectTrigger>
                    <SelectValue placeholder="İş Sahəsi (Kateqoriya)" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="it">IT</SelectItem>
                    <SelectItem value="education">Təhsil</SelectItem>
                    <SelectItem value="finance">Maliyyə</SelectItem>
                    <SelectItem value="healthcare">Səhiyyə</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex space-x-2">
                <Input
                    type="number"
                    placeholder="Min Maaş"
                    onChange={(e) => onFilterChange("minSalary", e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Max Maaş"
                    onChange={(e) => onFilterChange("maxSalary", e.target.value)}
                />
            </div>

            <Select onValueChange={(value) => onFilterChange("jobType", value)}>
                <SelectTrigger>
                    <SelectValue placeholder="İş Növü" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="full-time">Tam ştat</SelectItem>
                    <SelectItem value="part-time">Yarım ştat</SelectItem>
                    <SelectItem value="remote">Uzaqdan iş</SelectItem>
                    <SelectItem value="freelance">Freelancer</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange("schedule", value)}>
                <SelectTrigger>
                    <SelectValue placeholder="İş Qrafiki" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="shift">Növbəli iş</SelectItem>
                    <SelectItem value="fixed">Sabit iş qrafiki</SelectItem>
                    <SelectItem value="flexible">Çevik iş saatları</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange("postingDate", value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Vakansiyanın Tarixi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="last-week">Son bir həftə</SelectItem>
                    <SelectItem value="last-month">Son bir ay</SelectItem>
                    <SelectItem value="new">Yeni yerləşdirilənlər</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

