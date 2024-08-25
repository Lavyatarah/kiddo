"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { BookOpenIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAllAssignments } from "@/hooks/useAllAssignments";
import AssignmentListCard from "@/components/assignment-list-item";


const StudentAssignmentsPage = () => {
    const { assignments } = useAllAssignments();

    const title = "Math Homework"
    const subject = "Mathematics"
    const dueDate = "2023-06-15"
    const status = "not_started"
    const grade = "10"

    const getStatusColor = (status: string) => {
        switch (status) {
            case "not_started":
                return "bg-red-100 text-red-800"
            case "in_progress":
                return "bg-yellow-100 text-yellow-800"
            case "completed":
                return "bg-green-100 text-green-800"
            default:
                return "bg-gray-100 text-gray-800"
        }

    }

    const getButtonText = (status: string) => {
        return status === "not_started" ? "Begin Assignment" : "Continue Assignment"
    }


    return (
        <main>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle>
                        Assignments
                    </CardTitle>
                </CardHeader>
                <CardContent className="w-fit">
                    <ul className="flex flex-wrap gap-10 w-fit">
                        {assignments.map((assignment) => (
                            <li>
                                <AssignmentListCard assignment={assignment} />
                            </li>
                        ))}
                    </ul>


                </CardContent>
            </Card >
        </main >
    )
}

export default StudentAssignmentsPage