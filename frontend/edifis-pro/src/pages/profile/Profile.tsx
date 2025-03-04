import Chart from "../../components/chart/Chart";

export default function Profile() {
    return (
        <main className="min-h-[calc(100dvh-65px)] md:p-8 p-4">
            <div className="relative flex gap-8">
                <div className="flex h-48 w-48 overflow-hidden rounded-xl">
                    <img
                        className="object-cover h-full w-full"
                        src="https://t3.ftcdn.net/jpg/04/83/64/88/360_F_483648863_YYKtkmZ8DzaiWnelBXecbdnGlg7gvrFm.jpg"
                        alt="Photo de profile"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-medium">John Doe</h1>
                    <p className="text-slate-500 text-base mb-5">Ouvrier</p>
                    <h2>Informations</h2>
                    <p className="text-slate-500 text-sm">johndoe@mail.com</p>
                </div>
                <button className="absolute right-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-slate-200 text-slate-950 hover:bg-slate-300 h-9 py-2 pl-3.5 pr-4 cursor-pointer">Modifier</button>
            </div>
            <div className="h-96 w-full">
                <Chart />
            </div>
        </main>
    );
}