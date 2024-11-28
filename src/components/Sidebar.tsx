import React, { useState } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle.tsx";
import {Button} from "@/components/ui/button.tsx";

interface SidebarProps {
    items: SidebarItem[];
    isOpen: boolean;
    onProjectSelect: (projectPath: string) => void;
    selectedProject: string | null; // Track selected project
}

interface SidebarItem {
    title: string;
    path?: string;
    children?: SidebarItem[];
    icon?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isOpen, onProjectSelect, selectedProject }) => {
    const [activeDropdowns, setActiveDropdowns] = useState<{ [key: string]: boolean }>({});
    const location = useLocation(); // Get current path
    const navigate = useNavigate(); // To navigate programmatically

    const toggleDropdown = (title: string) => {
        setActiveDropdowns((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    // Handle Create Migration button click
    const handleCreateMigrationClick = () => {
        if (selectedProject) {
            // Navigate to the project-specific migration creation page
            navigate(`${selectedProject}/migrations/create`);
        } else {
            alert("Please select a project first!");
        }
    };

    return (
        <>
            <div
                className={`transform transition-transform ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } fixed top-[56px] left-0 w-64 h-[calc(100vh-56px)] bg-white text-black dark:bg-black dark:text-white
                border-t-2 shadow-xl overflow-y-auto pt-2 z-40 border-r`}
            >
                <div className={"w-full px-4 my-5"}>
                    <Button className={"w-full"} onClick={handleCreateMigrationClick}>
                        Create Migration
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="size-6 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </Button>
                </div>
                <ul className="space-y-2 px-4">
                    {items.map((item) => (
                        <SidebarItemComponent
                            key={item.title}
                            item={item}
                            isActive={activeDropdowns[item.title]}
                            toggleDropdown={toggleDropdown}
                            currentPath={location.pathname}
                            onProjectSelect={onProjectSelect}
                        />
                    ))}
                </ul>
                <ThemeToggle className={"w-full px-4 mt-10"}/>
            </div>
        </>
    );
};

interface SidebarItemComponentProps {
    item: SidebarItem;
    isActive: boolean;
    toggleDropdown: (title: string) => void;
    currentPath: string;
    onProjectSelect: (projectPath: string) => void;
}

const SidebarItemComponent: React.FC<SidebarItemComponentProps> = ({
                                                                       item,
                                                                       isActive,
                                                                       toggleDropdown,
                                                                       currentPath,
                                                                       onProjectSelect,
                                                                   }) => {
    const isSelected = item.path === currentPath; // Check if the item is selected

    return (
        <li>
            <div
                className={`flex justify-between items-center p-2 cursor-pointer rounded-md text-sm  ${
                    isSelected
                        ? "bg-gray-200 dark:bg-gray-custom-100 text-gray-900 dark:text-white font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-custom-100 text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white"
                }`}
                onClick={() => {
                    if (item.children) {
                        toggleDropdown(item.title);
                    } else if (item.path && item.path.startsWith("/projects")) {
                        onProjectSelect(item.path); // Update the selected project
                    }
                }}
            >
                <div className="flex items-center space-x-3 flex-grow">
                    {item.icon && <span>{item.icon}</span>}
                    {item.path ? (
                        <Link to={item.path} className="flex-grow">
                            {item.title}
                        </Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </div>
                {item.children && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                )}
            </div>
            {item.children && isActive && (
                <ul className="ml-4 space-y-2">
                    {item.children.map((child) => (
                        <SidebarItemComponent
                            key={child.title}
                            item={child}
                            isActive={false}
                            toggleDropdown={toggleDropdown}
                            currentPath={currentPath}
                            onProjectSelect={onProjectSelect}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;