import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.svg';

export default function Header() {
    return (
        <header className="sticky top-0 flex justify-between items-center w-full h-16 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:pr-8 pr-4 z-20">
            <nav className="flex items-center space-x-4 h-full w-[250px] md:border-r md:border-slate-200 md:px-8 px-4">
                <Link
                    to="/"
                    className="flex items-center align-center space-x-1.5 text-lg text-slate-950 font-semibold uppercase transition-colors"
                >
                    <img src={logo} alt="Edifis Pro" className="h-4 w-4" />
                    Edifis <span className="font-light">Pro</span>
                </Link>
            </nav>
            <div className="flex items-center space-x-4">
                <Link
                    to="/"
                    className="text-sm text-slate-950 transition-colors"
                >
                    Home
                </Link>
                <Link
                    to="/"
                    className="text-sm text-slate-950 transition-colors"
                >
                    About
                </Link>
                <Link
                    to="/"
                    className="text-sm text-slate-950 transition-colors"
                >
                    Contact
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-zinc-950 hover:bg-slate-300 h-9 px-4 py-2">Se connecter</Link>
                <Link to="/profile" className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-[20px] transition-all duration-300 ease-in-out hover:rounded-xl cursor-pointer">
                    <img className="aspect-square h-full w-full" src="https://github.com/shadcn.png" alt="photo de profil" />
                </Link>
            </div>
        </header>
    );
}