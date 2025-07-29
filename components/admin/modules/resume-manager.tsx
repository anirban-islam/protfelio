"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, Trash2, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Resume {
  _id: string
  fileName: string
  fileUrl: string
  isActive: boolean
  createdAt: string
}

export function ResumeManager() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const response = await fetch("/api/admin/resume")
      if (response.ok) {
        const data = await response.json()
        setResume(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resume",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setResume(data.resume)
        toast({
          title: "Success!",
          description: "Resume uploaded successfully",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error)
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload resume",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
      // Reset file input
      event.target.value = ""
    }
  }

  const handleDelete = async () => {
    if (!resume || !confirm("Are you sure you want to delete the current resume?")) return

    try {
      const response = await fetch(`/api/admin/resume?id=${resume._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setResume(null)
        toast({
          title: "Success!",
          description: "Resume deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Manager</h1>
        <p className="text-gray-600 dark:text-gray-300">Upload and manage your resume file</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Resume</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-upload">Choose PDF File</Label>
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Maximum file size: 5MB. Only PDF files are allowed.
              </p>
            </div>

            {uploading && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Upload className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Resume</CardTitle>
          </CardHeader>
          <CardContent>
            {resume ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{resume.fileName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Preview/Download
                    </a>
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No resume uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
