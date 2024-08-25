import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { BookOpenIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const AssignmentListCard = ({ assignment }) => {

    const [subject, setSubject] = useState({})

    useEffect(() => {
        const fetchAssignmentSubject = async () => {
            try {
                const res = await axios.get(`https://2541-41-139-206-153.ngrok-free.app/subjects/${assignment.subject_id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "*"
                    }
                });

                setSubject(res.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchAssignmentSubject()
    }, [assignment])
    return (
        <Card className="w-[500px]" key={assignment._id}>
            <CardHeader>
                <CardTitle className="text-lg font-bold">{assignment.name}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>{subject.name}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Due: {new Date(assignment.due_date).toLocaleString()}</span>
                    </div>
                    <Badge variant="secondary">Grade {subject.grade}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Status:</span>
                    <Badge >
                        Not Started
                    </Badge>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`assignments/${assignment._id}`}>
                    <Button className="w-full">
                        View Assignment
                    </Button></Link>
            </CardFooter>
        </Card>
    )
}

export default AssignmentListCard