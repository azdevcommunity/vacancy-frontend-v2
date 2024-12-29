'use client'

import {useState} from 'react'
import {useForm, useController} from 'react-hook-form'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Checkbox} from "@/components/ui/checkbox"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {CalendarIcon} from "@radix-ui/react-icons"
import {format} from "date-fns"
import {cn} from "@/lib/utils"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const formatDate = (date) => {
    return date ? format(date, "PPP") : "Tarix seç";
};

const cities = [
    'Bakı',
    'Gəncə',
    'Sumqayıt',
    'Mingəçevir',
    'Lənkəran',
    'Şəki',
    'Yevlax',
    'Göyçay',
    'Quba',
    'Qusar',
    'İsmayıllı',
    'Astara',
    'Qazax',
    'Tovuz',
    'Balakən',
    'Zaqatala',
    'Şamaxı',
    'Ağdam',
    'Ağdaş',
    'Ağcabədi',
    'Ağsu',
    'Bərdə',
    'Biləsuvar',
    'Cəlilabad',
    'Cəbrayıl'
]

const categories = [
    'IT',
    'Maliyyə',
    'Marketinq',
    'Mühəndislik',
    'Tibb',
    'İdarəetmə',
    'Mühasibat',
    'İnsan Resursları',
    'Dizayn',
    'Müəllim',
    'Sürücü',
    'Satış',
    'Xidmət',
    'Sənaye'
]

export default function AddVacancy() {
    const {register, handleSubmit, control, reset} = useForm()
    const [isSalaryByAgreement, setIsSalaryByAgreement] = useState(false)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const onSubmit = (data) => {
        console.log(data)
        // Here you would typically send this data to your backend
    }

    const handleReset = () => {
        reset();
        setIsSalaryByAgreement(false);
    };

    const {field} = useController({
        name: 'deadline',
        control,
        rules: {required: true},
    })

    return (
        <div className="container mx-auto py-12 max-w-3xl px-4 sm:px-6 lg:px-8  min-h-screen">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10"></div>
            <Card className="shadow-lg border-t-4 border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">Yeni vakansiya əlavə et</CardTitle>
                    <CardDescription className="text-blue-100">Aşağıdakı məlumatları doldurun.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
                        <div className="pt-6">
                            <div className="space-x-2 flex max-sm:flex-col max-sm:space-x-0">
                                <div className={"w-full"}>
                                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Kateqoriya</Label>
                                    <Select onValueChange={(value) => register('category').onChange({target: {value}})}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Kateqoriya seç"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className={"w-full"}>
                                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">Şəhər</Label>
                                    <Select onValueChange={(value) => register('city').onChange({target: {value}})}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Şəhər seç"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map((city) => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="salary" className="text-sm font-medium text-gray-700">Maaş</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        placeholder="Maaş daxil edin"
                                        {...register('salary')}
                                        disabled={isSalaryByAgreement}
                                    />
                                    <div className="flex items-center space-x-2">

                                        <Checkbox
                                            id="salaryByAgreement"
                                            checked={isSalaryByAgreement}
                                            onCheckedChange={(checked) => {
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                //@ts-expect-error
                                                setIsSalaryByAgreement(checked)
                                                if (checked) {
                                                    register('salary').onChange({target: {value: 'Razılaşma yolu ilə'}})
                                                }
                                            }}
                                        />
                                        <label htmlFor="salaryByAgreement">Razılaşma yolu ilə</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Məzmun</Label>
                                <Textarea placeholder="Məzmun" {...register('description')} className="w-full" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="duties" className="text-sm font-medium text-gray-700">Vəzifə və öhdəliklər</Label>
                                <Textarea placeholder="Vəzifə və öhdəliklər" {...register('duties')} className="w-full" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="education" className="text-sm font-medium text-gray-700">Təhsil və ixtisas tələbləri Requests</Label>
                                <Textarea placeholder="Təhsil və ixtisas tələbləri" {...register('education')} className="w-full" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="experience" className="text-sm font-medium text-gray-700">İş təcrübəsi</Label>
                                <Input placeholder="İş təcrübəsi" {...register('experience')} />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-sm font-medium text-gray-700">Bilik və bacarıqlar</Label>
                                <Textarea placeholder="Bilik və bacarıqlar" {...register('skills')} className="w-full" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="superiority" className="text-sm font-medium text-gray-700">Üstünlük verilir</Label>
                                <Textarea placeholder="Üstünlük verilir." {...register('superiority')} className="w-full" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Başlıq</Label>
                                <Input placeholder="Vakansiya başlığı" {...register('title')} />
                            </div>
                        </div>

                        <div className="pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="text-sm font-medium text-gray-700">Son tarix</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4"/>
                                            {formatDate(field.value)}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                // Close the popover after selection
                                                document.body.click();
                                            }}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex justify-between pt-10">
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Yarat</Button>
                            <Button type="button" variant="outline" onClick={handleReset} className="border-blue-600 text-blue-600 hover:bg-blue-50">Sıfırla</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}