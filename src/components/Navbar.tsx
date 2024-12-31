'use client'

import { Menu, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuItems = [
        { name: "Ana Səhifə", link: "#", icon: "🏠", path: "/" },
        {
            name: "Vakansiyalar",
            link: "#",
            icon: "💼",
            subItems: [
                { name: "Full-time", link: "#" },
                { name: "Part-time", link: "#" },
                { name: "Remote", link: "#" },
                { name: "Internship", link: "#" },
            ],
        },
        { name: "Namizədlər", path: "/candidates", icon: "👥" },
        { name: "Haqqımızda", link: "#", icon: "ℹ️" },
    ]

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            isScrolled
                ? 'bg-background/80 backdrop-blur-sm border-b'
                : location.pathname === '/'
                    ? 'bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-800'
                    : 'bg-background'
        }`}>
            <div className="max-w-[1400px] mx-auto flex h-16 items-center justify-between px-8">
                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                        <div className="bg-gradient-to-br from-primary to-primary-foreground p-6 text-white">
                            <h2 className="text-2xl font-bold">Menu</h2>
                            <p className="text-sm opacity-80">Daha çox şey et</p>
                        </div>
                        <nav className="p-4">
                            {menuItems.map((item, index) => (
                                <div key={index} className="mb-4">
                                    {item.subItems ? (
                                        <div className="space-y-2">
                                            <h2 className="flex items-center text-lg font-semibold">
                                                <span className="mr-2 text-2xl">{item.icon}</span>
                                                {item.name}
                                            </h2>
                                            <div className="ml-8 space-y-1">
                                                {item.subItems.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.link}
                                                        className="flex items-center rounded-md py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <ChevronRight className="mr-2 h-4 w-4" />
                                                        {subItem.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.path!}
                                            className="flex items-center rounded-md py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="mr-2 text-2xl">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    )}
                                    {index < menuItems.length - 1 && <Separator className="my-2" />}
                                </div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Left section with Logo */}
                <div className="flex items-center gap-4">
                    <Link to="/" className={`text-xl font-semibold whitespace-nowrap ${isScrolled ? 'text-black' : location.pathname !== '/' ? 'text-black' : 'text-white'}
                    `}>
                        LOQO
                    </Link>
                </div>

                {/* Center section with Navigation */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="hidden gap-6 md:flex">
                        <NavigationMenuItem>
                            <Link to="/">
                                <NavigationMenuLink
                                    className={`text-sm font-medium transition-colors 
                                                                        ${isScrolled || location.pathname !== '/' ? 'text-muted-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}
                                >
                                    Ana Səhifə
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger
                                className={`text-sm font-medium transition-colors text-muted-foreground
                                `}
                            >
                                Vakansiyalar
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="min-w-[220px]">
                                <ul className="grid gap-2 p-4">
                                    {menuItems[1].subItems?.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.link}
                                                className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/candidates">
                                <NavigationMenuLink
                                    className={`text-sm font-medium transition-colors 
                                    ${isScrolled || location.pathname !== '/' ? 'text-muted-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}
                                >
                                    Namizədlər
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="#">
                                <NavigationMenuLink
                                    className={`text-sm font-medium transition-colors 
                                    ${isScrolled || location.pathname !== '/' ? 'text-muted-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}
                                >
                                    Haqqımızda
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right section - empty for spacing */}
                <Button
                    variant={isScrolled ? "ghost" : "outline"}
                    size="sm"
                    className={`text-sm font-medium ${isScrolled ? '' : 'hover:text-white hover:bg-white/20'}`}
                    onClick={() => navigate("/add-vacancy")}
                >
                    Profil
                </Button>
            </div>
        </header>
    )
}