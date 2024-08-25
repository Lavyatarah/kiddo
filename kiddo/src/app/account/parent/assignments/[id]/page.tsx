"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const AssignmentPage = ({ params }) => {
    const { id } = params;
    const formRef = useRef<HTMLFormElement | null>(null)
    const [assignmentDetails, setAssignmentDetails] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        const fetchAssignmentById = async (id: string) => {
            try {
                const response = await axios.get(`https://2541-41-139-206-153.ngrok-free.app/assignments/${id}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "*"
                    }
                })

                setAssignmentDetails(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchAssignmentById(id)
    }, [params])


    const [remarks, setRemarks] = useState('')
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }


    const uploadAssignmentFile = async (assignmentFile: File) => {
        try {
            const formData = new FormData();
            formData.append("image", assignmentFile);

            const response = await axios.post("https://2541-41-139-206-153.ngrok-free.app/images", formData)

            //console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    const submitAssignment = async (file_name) => {
        try {
            const date = new Date();
            const submissionBody = {
                assignment_id: assignmentDetails._id,
                description: remarks,
                submission_date: date,
                parent_id: "66ca8af42803814d70a036f2",
                resource_id: file_name
            }
            const res = await axios.post("https://2541-41-139-206-153.ngrok-free.app/submission", submissionBody);
            return res.data
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(false)

        if (file) {
            try {
                const response = await uploadAssignmentFile(file);
                if (response) {
                    const res = await submitAssignment(response.image.file_name)
                    if (res) {
                        if (formRef.current) {
                            formRef.current.reset();
                            setRemarks(null)
                            setFile(null)
                        }
                        setIsSubmitting(false)
                        alert("Assignment has been submitted successfully!")
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
    }


    return (
        <main className="space-y-5">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Assignment {assignmentDetails._id} - {assignmentDetails.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-500"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quasi totam architecto, nulla ipsam dolores excepturi officia ad at labore tempore dicta nemo soluta amet laborum sunt commodi debitis nisi?</p>
                </CardContent>

            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Attachments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        assignmentDetails.resource_id && <Image
                            src={`https://2541-41-139-206-153.ngrok-free.app/uploads/${assignmentDetails.resource_id}`}
                            alt={`Picture of ${assignmentDetails.name}`}
                            width={500}
                            height={500}
                            unoptimized
                        />
                    }
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Submit Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <Textarea
                                id="remarks"
                                placeholder="Add any comments or notes about your submission"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Upload File</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="w-full disabled:bg-slate-400 disabled:cursor-not-allowed">
                            <UploadIcon className="mr-2 h-4 w-4" /> Submit Assignment
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default AssignmentPage