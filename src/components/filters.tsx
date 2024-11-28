import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FiltersProps {
    onFilterChange: (key: string, value: string) => void
}

export function Filters({ onFilterChange }: FiltersProps) {
    return (
        <div className="flex flex-wrap gap-4">
            <Select onValueChange={(value) => onFilterChange('postingType', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Elanlar" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="job postings">İş elanları</SelectItem>
                    <SelectItem value="Experience program">Təcrübə proqramı</SelectItem>
                    <SelectItem value="Taqaud program">Təqaüd proqramı</SelectItem>
                    <SelectItem value="Tender">Tender</SelectItem>
                    <SelectItem value="Qrant">Qrant</SelectItem>
                    <SelectItem value="Other">Digər</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('timeFrame', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Yerləşdirilib" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">1 gün</SelectItem>
                    <SelectItem value="3">3 gün</SelectItem>
                    <SelectItem value="7">1 həftə</SelectItem>
                    <SelectItem value="10">10 gün</SelectItem>
                    <SelectItem value="14">2 həftə</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('sorting', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="alphabetical">Əmək haqqı və Vəzifə adı A-Z</SelectItem>
                    <SelectItem value="company">Şirkət adı A-Z</SelectItem>
                    <SelectItem value="views">Ən çox baxış sayı</SelectItem>
                    <SelectItem value="popular">Ən populyar kateqoriya</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('grade', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Vəzifə dərəcəsi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Experienced Köməkçi">Təcrübəli Köməkçi</SelectItem>
                    <SelectItem value="mutaxəssis">Mütəxəssis</SelectItem>
                    <SelectItem value="manager">Menecer</SelectItem>
                    <SelectItem value="Director">Direktor</SelectItem>
                    <SelectItem value="up guidance">Yuxarı rəhbərlik</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('salary', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Maaş" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0-500">0-500</SelectItem>
                    <SelectItem value="500-1000">500-1000</SelectItem>
                    <SelectItem value="1000-2000">1000-2000</SelectItem>
                    <SelectItem value="2000-5000">2000-5000</SelectItem>
                    <SelectItem value="5000+">5000+</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('location', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Ərazi" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Baku">Bakı</SelectItem>
                    <SelectItem value="Ganja">Gəncə</SelectItem>
                    <SelectItem value="Agdash">Ağdaş</SelectItem>
                    {/* Add more cities as needed */}
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => onFilterChange('type', value)}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Məşğulluq" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Full">Tam</SelectItem>
                    <SelectItem value="I'm not sure">Natamam</SelectItem>
                    <SelectItem value="experience">Təcrübə</SelectItem>
                    <SelectItem value="temporary">Müvəqqəti</SelectItem>
                    <SelectItem value="distance">Məsafədən</SelectItem>
                    <SelectItem value="Frilans (Xidmət)">Frilans (Xidmət)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}