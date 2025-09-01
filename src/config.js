// TakeSelfCare Platform Configuration

export const config = {
  // Google Apps Script Web App URL
  // Replace with your actual Google Apps Script deployment URL
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  
  // Platform Information
  PLATFORM_NAME: 'TakeSelfCare',
  PLATFORM_TAGLINE: 'The Ultimate Beauty & Wellness Platform',
  
  // Contact Information
  CONTACT_EMAIL: 'hello@takeselfcare.com',
  SUPPORT_PHONE: '+1 (555) BEAUTY-1',
  COMPANY_ADDRESS: 'Beauty Tech Hub, Silicon Valley',
  
  // Social Media Links (replace with your actual links)
  SOCIAL_MEDIA: {
    instagram: 'https://instagram.com/takeselfcare',
    facebook: 'https://facebook.com/takeselfcare',
    twitter: 'https://twitter.com/takeselfcare'
  },
  
  // Launch Configuration
  LAUNCH_DAYS_FROM_NOW: 45,
  
  // Feature Flags
  FEATURES: {
    EMAIL_COLLECTION: true,
    SOCIAL_SHARING: true,
    ANALYTICS: false
  }
}

// Validation function to check if configuration is complete
export const validateConfig = () => {
  const errors = []
  
  if (config.GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
    errors.push('Google Apps Script URL needs to be updated with your actual Script ID')
  }
  
  if (!config.PLATFORM_NAME) {
    errors.push('Platform name is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export default config



