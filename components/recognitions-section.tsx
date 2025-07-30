"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Recognition {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export function RecognitionsSection() {
  const [recognitions, setRecognitions] = useState<Recognition[]>([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        const res = await fetch("/api/admin/recognitions")
        if (res.ok) {
          const data = await res.json()
          setRecognitions(data)
        }
      } catch (error) {
        console.error("Failed to load recognitions:", error)
      }
    }

    fetchRecognitions()
  }, [])

  const visibleRecognitions = showAll ? recognitions : recognitions.slice(0, 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">🏆</span>
          <span>Recognizations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {visibleRecognitions.map((recognition, index) => (
          <div key={recognition.id || index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${recognition.color}`}>
              <span className="text-lg">{recognition.icon}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900">{recognition.title}</h4>
              <p className="text-xs text-gray-600">{recognition.description}</p>
            </div>
          </div>
        ))}

        {recognitions.length > 2 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 hover:underline text-sm"
          >
            See More
          </button>
        )}

        {recognitions.length > 2 && showAll && recognitions.length > 2 && (
          <button
            onClick={() => setShowAll(false)}
            className="text-blue-600 hover:underline text-sm"
          >
            See Less
          </button>
        )}
      </CardContent>
    </Card>
  )
}
