import Link from "next/link";
import { ReactNode } from "react";

export const ParentDashboardLayout = ({ children }: {
    children: ReactNode
}) => {
    return <main>
        <header className="container sticky top-0 flex items-center justify-between py-5 bg-slate-100 shadow-md rounded-full mt-10">
            <h1 className="font-bold">Kiddo</h1>
            <nav>
                <ul className="flex items-center gap-10">
                    <li><Link href="/account/parent">Dashboard</Link></li>
                    <li><Link href="/account/parent/assignments">Assignments</Link></li>
                    <li><Link href="grades">Grades</Link></li>
                </ul>
            </nav>
        </header>
        <section className="container py-10">
            {children}
        </section>
    </main>
}

export default ParentDashboardLayout;