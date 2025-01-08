'use client'

import {Menu} from 'lucide-react'
import {useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'

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
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        // Reset isScrolled state when the route changes
        setIsScrolled(false)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [location.pathname])

    const menuItems = [
        {name: "Ana Səhifə", icon: "🏠", path: "/"},
        {name: "Vakansiyalar", icon: "💼", path: "/vacancies"},
        {name: "Namizədlər", icon: "👥", path: "/candidates"},
        {name: "Haqqımızda", icon: "ℹ️", path: "/about"},
    ]

    const isMainPage = location.pathname === '/'
    const shouldUseTransparentBg = !isScrolled && isMainPage

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            shouldUseTransparentBg
                ? 'bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-800'
                : 'bg-background/80 backdrop-blur-sm border-b'
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
                                        to={item.path}
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
                          className={`text-xl font-semibold whitespace-nowrap ${shouldUseTransparentBg ? 'text-white' : 'text-foreground'}`}>
                        LOQO
                    </Link>
                </div>

                {/* Center section with Navigation */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="hidden gap-6 md:flex">
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.path}>
                                <Link to={item.path}>
                                    <NavigationMenuLink
                                        className={`text-sm font-semibold  p-3
                                        ${shouldUseTransparentBg
                                            ? 'text-white hover:text-black hover:bg-white rounded-xl'
                                            : `text-muted-foreground hover:bg-accent ${location.pathname !== item.path  ? 'hover:text-accent-foreground' : ''} rounded-xl`}
                                            ${location.pathname === item.path && location.pathname !== '/' ? 'bg-gradient-to-tr from-blue-600 via-indigo-700 to-purple-800 text-white' : ''}

                                            `}
                                    >
                                        {item.name}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Right section - empty for spacing */}
                <div></div>
            </div>
        </header>
    )
}

