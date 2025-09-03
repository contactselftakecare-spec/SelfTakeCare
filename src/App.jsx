import React, { useState, useEffect } from 'react'
import { Store, Users, ShoppingBag, Sparkles, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Building2, Package, Heart, UserPlus, TrendingUp, Shield, Zap, Loader } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'

  // Utility function to change launch date (you can call this from browser console if needed)
  const changeLaunchDate = (year, month, day, hour = 0, minute = 0) => {
    const newLaunchDate = new Date(year, month - 1, day, hour, minute, 0)
    localStorage.setItem('launchDate', newLaunchDate.toISOString())
    window.location.reload() // Reload to apply new date
  }

  // Firebase configuration - replace with your actual config
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    // Get launch date from localStorage or set a default fixed date
    let launchDate
    const storedLaunchDate = localStorage.getItem('launchDate')
    
    if (storedLaunchDate) {
      launchDate = new Date(storedLaunchDate)
    } else {
      // Set a default fixed launch date (you can change this to your actual launch date)
      // Format: Year, Month (0-indexed), Day, Hour, Minute
      launchDate = new Date(2025, 8, 13, 0, 0, 0) // September 13, 2025 at midnight
      // Store it in localStorage for persistence
      localStorage.setItem('launchDate', launchDate.toISOString())
    }
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = launchDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Function to handle email submission
  const handleEmailSubmit = async (e, userType = 'general') => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      setMessageType('error')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      console.log('Adding email to Firebase...')
      // Check if email already exists
      const emailQuery = query(collection(db, 'subscribers'), where('email', '==', email.toLowerCase().trim()));
      const emailSnapshot = await getDocs(emailQuery);
      
      if (!emailSnapshot.empty) {
        setMessage('This email is already registered!')
        setMessageType('error')
        return
      }

      // Add email to Firebase
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email: email.toLowerCase().trim(),
        userType: userType,
        source: 'website',
        timestamp: new Date().toISOString(),
        status: 'active'
      });

      console.log('Email added successfully with ID:', docRef.id)
      
      setMessage('🎉 Thank you! You\'ve been added to our early access list!')
      setMessageType('success')
      setEmail('')
      
    } catch (error) {
      console.error('Error adding email:', error)
      
      if (error.code === 'permission-denied') {
        setMessage('Permission denied. Please check Firebase security rules.')
      } else if (error.code === 'unavailable') {
        setMessage('Service temporarily unavailable. Please try again.')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
      
      setMessageType('error')
    } finally {
      setIsLoading(false)
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        
        {/* Header */}
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600  rounded-full shadow-xl">
              <img src="https://ucarecdn.com/dae78989-1a88-4498-9fec-2e683eed94dc/selftakecare1.svg" alt="SelfTakeCare Logo" className="h-56 w-58" />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            SelfTakeCare
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-light mb-4">
            The Ultimate Beauty & Wellness Platform
          </p>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Connecting salon owners, beauty product sellers, and wellness enthusiasts in one revolutionary ecosystem
          </p>
        </div>

        {/* Platform Overview */}
        <div className="animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Revolutionizing the Beauty Industry
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
            Our comprehensive platform empowers salon owners to grow their business, enables sellers to reach more customers, 
            and provides consumers with access to premium beauty services and authentic products.
          </p>
        </div>

        {/* Target Audiences */}
        <div className="animate-slide-up delay-300">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Who We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Salon Owners */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">Salon Owners</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Register and manage your salon profile</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Showcase services and pricing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Manage bookings and appointments</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Connect with customers directly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Advanced analytics and insights</span>
                </li>
              </ul>
            </div>

            {/* Product Sellers */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">Product Sellers</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sell beauty products & medicines</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Reach verified salon partners</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Inventory management tools</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sales performance tracking</span>
                </li>
              </ul>
            </div>

            {/* Customers */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">Beauty Enthusiasts</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Discover top-rated salons nearby</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Book appointments seamlessly</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Shop authentic beauty products</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Read reviews and ratings</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Exclusive deals and offers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="animate-slide-up delay-500">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Platform Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: UserPlus, title: 'Easy Registration', desc: 'Simple onboarding for all users', color: 'from-green-500 to-emerald-500' },
              { icon: TrendingUp, title: 'Business Growth', desc: 'Analytics & marketing tools', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Secure Platform', desc: 'Protected transactions & data', color: 'from-red-500 to-pink-500' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for speed & performance', color: 'from-yellow-500 to-orange-500' }
            ].map((feature, index) => (
              <div key={feature.title} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="animate-slide-up delay-700 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Platform Launch In:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={item.label} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Early Access Signup */}
        <div className="animate-slide-up delay-900 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-10 text-white text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Get Early Access</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of beauty professionals and enthusiasts who are already signed up for exclusive early access to SelfTakeCare!
          </p>
          
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl ${
              messageType === 'success' 
                ? 'bg-green-500/20 border border-green-300/30 text-green-100' 
                : 'bg-red-500/20 border border-red-300/30 text-red-100'
            }`}>
              {message}
            </div>
          )}
          
          <form onSubmit={(e) => handleEmailSubmit(e, 'general')} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={isLoading}
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button 
                type="submit"
                disabled={isLoading || !email}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </form>
          <p className="text-sm mt-4 opacity-75">
            Be among the first to experience the future of beauty business!
          </p>
        </div>

        {/* Contact Info */}
        <div className="animate-slide-up delay-1000 bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Contact Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">contact.selftakecare@gmail.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <p className="text-gray-600">+917499405050</p>
                <p className="text-gray-600">+919359798819</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">Kolhapur, Maharashtra</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Support</p>
                <p className="text-gray-600">24/7 Customer Service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="animate-slide-up delay-1100 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Journey</h3>
          <div className="flex justify-center space-x-6">
            {[
              { Icon: Instagram, href: 'https://www.instagram.com/selftakecareindia?igsh=MTc3bjZhMWplNjVtaQ==', color: 'hover:bg-pink-500', bgColor: 'bg-pink-100' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/selftakecare', color: 'hover:bg-blue-600', bgColor: 'bg-blue-100' }
            ].map(({ Icon, href, color, bgColor }, index) => (
              <a
                key={index}
                href={href}
                className={`p-4 ${bgColor} rounded-full shadow-lg text-gray-600 ${color} hover:text-white transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
              >
                <Icon className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="animate-fade-in delay-1200 text-center text-gray-500 border-t border-gray-200 pt-8">
          <p className="text-lg">&copy; 2025 SelfTakeCare Platform. All rights reserved.</p>
          <p className="mt-2">Transforming the beauty industry, one connection at a time.</p>
        </div>

      </div>
    </div>
  )
}

export default App

//thhis is changed file