import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { House } from 'lucide-react'
import { Construction } from 'lucide-react'
import { Hammer } from 'lucide-react'
import { UserRound } from 'lucide-react'
import { FolderClosed } from 'lucide-react'
import { LogOut } from 'lucide-react'

const routes = [
    { to: "/", label: "Accueil", Icon: House },
    { to: "/missions", label: "Mission", Icon: Hammer },
    { to: "/clients", label: "Clients", Icon: FolderClosed },
    { to: "/construction", label: "Chantiers", Icon: Construction },
    { to: "/worker", label: "Employés", Icon: UserRound },
]

export default function SideBar() {
    const location = useLocation()
    return (
        <aside className="fixed top-0 left-0 flex flex-col justify-between h-dvh w-[250px] bg-white border-r border-slate-200 pt-16 md:transform md:translate-x-0 transform -translate-x-full">
            <ul className="flex flex-col space-y-1.5 p-4">
                {routes.map(({ to, label, Icon }, index) => (
                    <Link to={to}>
                        <li
                            key={index}
                            className={`flex items-center space-x-2 h-8 transition-colors px-2.5 rounded-md cursor-pointer ${location.pathname === to ? "bg-slate-200" : "bg-transparent hover:bg-slate-200"}`}
                        >
                            <Icon size={18} />
                            <span className="text-slate-950 text-sm">{label}</span>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="p-4">
                <button className='inline-flex items-center justify-between whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent text-slate-950 hover:bg-slate-200 h-9 w-full px-4 py-2 cursor-pointer'>
                    Se déconnecter
                    <LogOut size={18} className='ml-2' />
                </button>
            </div>
        </aside>
    )
}