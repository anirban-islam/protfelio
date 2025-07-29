import { PublicLayout } from "@/components/layout/public-layout"
import { MiddleContentWrapper } from "@/components/layout/middle-content-wrapper"
import { ContactFormSection } from "@/components/contact-form-section"

export default function ContactPage() {
  return (
    <PublicLayout>
      <MiddleContentWrapper
        title="Get In Touch"
        description="Ready to start your project? Let's discuss your ideas and bring them to life!"
      >
        <div className="max-w-2xl mx-auto">
          <ContactFormSection />

          {/* Additional contact information */}
          <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Other Ways to Reach Me</h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center space-x-3">
                <span className="text-purple-600">📧</span>
                <span>dev.anirbanislam@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-600">🌍</span>
                <span>Bangladesh (GMT+6)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-600">⚡</span>
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-8 text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready to Start?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I'm excited to hear about your project and discuss how we can work together to achieve your goals.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                Web Development
              </span>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                Full-Stack Solutions
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                UI/UX Design
              </span>
            </div>
          </div>
        </div>
      </MiddleContentWrapper>
    </PublicLayout>
  )
}
