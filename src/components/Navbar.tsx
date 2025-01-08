'use client'

import {Menu} from 'lucide-react'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import {Button} from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Separator} from "@/components/ui/separator"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menuItems = [
        {name: "Ana Səhifə", link: "#", icon: "🏠", path: "/"},
        {
            name: "Vakansiyalar",
            link: "#",
            icon: "💼",
            path: "/vacancies",
        },
        {name: "Namizədlər", path: "/candidates", icon: "👥"},
        {name: "Haqqımızda", link: "#", icon: "ℹ️"},
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
                            <Menu className="h-5 w-5"/>
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

                                    <Link
                                        to={item.path!}
                                        className="flex items-center rounded-md py-2 text-lg font-semibold transition-colors hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="mr-2 text-2xl">{item.icon}</span>
                                        {item.name}
                                    </Link>

                                    {index < menuItems.length - 1 && <Separator className="my-2"/>}
                                </div>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Left section with Logo */}
                <div className="flex items-center gap-4">
                    <Link to="/"
                          className={`text-xl font-semibold whitespace-nowrap ${isScrolled ? 'text-black' : location.pathname !== '/' ? 'text-black' : 'text-white'}
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
                            <Link to="/vacancies">
                                <NavigationMenuLink
                                    className={`text-sm font-medium transition-colors 
                                                                        ${isScrolled || location.pathname !== '/' ? 'text-muted-foreground hover:text-primary' : 'text-white hover:text-white/80'}`}
                                >
                                    Vakansiyalar
                                </NavigationMenuLink>
                            </Link>
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

                {/*/!* Right section - empty for spacing *!/*/}
                {/*<Button*/}
                {/*    variant={isScrolled ? "ghost" : "outline"}*/}
                {/*    size="sm"*/}
                {/*    className={`text-sm font-medium ${isScrolled ? '' : 'hover:text-white hover:bg-white/20'}`}*/}
                {/*    onClick={() => navigate("/add-vacancy")}*/}
                {/*>*/}
                {/*    Profil*/}
                {/*</Button>*/}
                <div></div>
            </div>
        </header>
    )
}