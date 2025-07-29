import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecognitionsSection() {
  const recognitions = [
    {
      title: "Pupil",
      description: "Achieved the 'Pupil' badge on Codeforces",
      icon: "🏆",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Excellence",
      description: "Coding maestro",
      icon: "⚡",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Pupil",
      description: "GitHub Experts badge",
      icon: "🏆",
      color: "bg-blue-100 text-blue-700",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">🏆</span>
          <span>Recognizations</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recognitions.map((recognition, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${recognition.color}`}>
              <span className="text-lg">{recognition.icon}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900">{recognition.title}</h4>
              <p className="text-xs text-gray-600">{recognition.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
