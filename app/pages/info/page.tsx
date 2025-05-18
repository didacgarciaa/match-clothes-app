import Layout from '@/components/layout/Layout'
import { colors } from '@/lib/config/colors'

export default function InfoPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>
            About MatchClothes
          </h1>

          <div className="prose prose-lg mx-auto" style={{ color: colors.text }}>
            <p className="text-xl mb-8 text-center">
              Your AI-powered fashion assistant that helps you create the perfect outfit
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundLight }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                  Our Mission
                </h2>
                <p>
                  At MatchClothes, we're revolutionizing the way people dress by combining artificial intelligence with fashion expertise. Our goal is to make fashion accessible, fun, and personalized for everyone.
                </p>
              </div>

              <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundLight }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                  What We Offer
                </h2>
                <ul className="space-y-2">
                  <li>AI-powered outfit recommendations</li>
                  <li>Virtual try-on technology</li>
                  <li>Personalized style analysis</li>
                  <li>Seasonal trend updates</li>
                </ul>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.primary }}>
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>1</div>
                  <h3 className="font-semibold mb-2">Upload Your Clothes</h3>
                  <p className="text-sm">Take photos of your clothes or upload them from your gallery</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>2</div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm">Our AI analyzes your style and preferences</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>3</div>
                  <h3 className="font-semibold mb-2">Get Recommendations</h3>
                  <p className="text-sm">Receive personalized outfit suggestions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 