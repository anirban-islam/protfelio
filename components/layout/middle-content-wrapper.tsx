import type React from "react"

interface MiddleContentWrapperProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function MiddleContentWrapper({ children, title, description }: MiddleContentWrapperProps) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          {description && <p className="text-xl text-gray-600 dark:text-gray-300">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
