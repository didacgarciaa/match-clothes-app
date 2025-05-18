import Layout from '@/components/layout/Layout'
import { colors } from '@/lib/config/colors'

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8" style={{ color: colors.text }}>
            Contact Us
          </h1>
          
          <form className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                style={{ 
                  backgroundColor: colors.backgroundLight,
                  borderColor: colors.border.light,
                  color: colors.text
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                style={{ 
                  backgroundColor: colors.backgroundLight,
                  borderColor: colors.border.light,
                  color: colors.text
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                style={{ 
                  backgroundColor: colors.backgroundLight,
                  borderColor: colors.border.light,
                  color: colors.text
                }}
                required
              />
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.text }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#e60023]"
                style={{ 
                  backgroundColor: colors.backgroundLight,
                  borderColor: colors.border.light,
                  color: colors.text
                }}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg font-medium text-white transition-colors duration-200"
              style={{ backgroundColor: colors.primary }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
} 