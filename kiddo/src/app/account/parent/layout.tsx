import Link from "next/link";
import { ReactNode } from "react";

export const ParentDashboardLayout = ({ children }: {
    children: ReactNode
}) => {
    return <main>
        <nav className="container flex items-center justify-between py-5 bg-slate-100 shadow-md rounded-full mt-10">
            <h1 className="font-bold">Kiddo</h1>
            <ul className="flex items-center gap-10">
                <li><Link href="dashboard">Dashboard</Link></li>
                <li><Link href="assignments">Assignments</Link></li>
                <li><Link href="grades">Grades</Link></li>
            </ul>
        </nav>
        <section className="container py-10">
            {children}
        </section>
    </main>
}

export default ParentDashboardLayout;