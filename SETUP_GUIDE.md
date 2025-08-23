# TakeSelfCare Platform - Complete Setup Guide

This guide will help you set up the complete email collection system for your TakeSelfCare platform.

## 🚀 Quick Start

### 1. Frontend Setup (Already Complete)
Your React application is ready with:
- Modern coming soon page design
- Email collection form with validation
- Loading states and error handling
- Responsive design

### 2. Backend Setup (Google Apps Script)

#### Step 2.1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: `TakeSelfCare Email Subscribers`
4. Keep this tab open - you'll need it

#### Step 2.2: Set up Google Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Replace the default code with the content from `google-apps-script/Code.gs`
4. Update the configuration in the script:
   ```javascript
   const NOTIFICATION_EMAIL = 'your-email@gmail.com'; // Replace with your email
   ```
5. Save the project (Ctrl+S or Cmd+S)
6. Name your project: `TakeSelfCare Email Collection`

#### Step 2.3: Connect to Your Spreadsheet
**Important**: The script will automatically create and connect to a sheet named "Email Subscribers" when you first run it. You don't need to manually connect it.

However, if you want to use a specific existing spreadsheet:
1. Open your `TakeSelfCare Email Subscribers` Google Sheet
2. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```
3. In your Apps Script, modify the `getOrCreateSheet()` function to use your specific spreadsheet:
   ```javascript
   function getOrCreateSheet() {
     // Replace 'YOUR_SPREADSHEET_ID' with your actual spreadsheet ID
     const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
     let sheet = spreadsheet.getSheetByName(SHEET_NAME);
     
     if (!sheet) {
       sheet = spreadsheet.insertSheet(SHEET_NAME);
     }
     
     return sheet;
   }
   ```

**Easier Option**: Just let the script create its own spreadsheet automatically - it will work perfectly!

#### Step 2.4: Test the Setup
1. In Apps Script editor, select `testEmailCollection` function
2. Click **"Run"** button
3. Authorize the script when prompted (Grant necessary permissions)
4. Check your Google Sheet - you should see test data added

#### Step 2.5: Deploy as Web App
1. Click **"Deploy"** → **"New Deployment"**
2. Click the settings gear icon next to "Type"
3. Select **"Web app"**
4. Configure:
   - **Description**: `TakeSelfCare Email Collection API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
5. Click **"Deploy"**
6. **IMPORTANT**: Copy the Web App URL - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

### 3. Connect Frontend to Backend

#### Step 3.1: Update the Configuration
1. Open `src/App.jsx`
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual script ID from the Web App URL

#### Alternative: Use Config File
1. Open `src/config.js`
2. Update the `GOOGLE_SCRIPT_URL` with your Web App URL
3. Import and use the config in `App.jsx`

### 4. Test the Complete System

#### Step 4.1: Test Frontend
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173`
3. Try submitting an email in the "Get Early Access" section

#### Step 4.2: Verify Data Storage
1. Check your Google Sheet
2. You should see new entries with:
   - Timestamp
   - Email address
   - User type
   - Source
   - Status

### 5. Production Deployment

#### Step 5.1: Build for Production
```bash
npm run build
```

#### Step 5.2: Deploy to Your Domain
1. Upload the `dist` folder contents to your web server
2. Point your domain to the uploaded files
3. Test the email collection on your live site

## 📊 Google Sheet Structure

Your sheet will automatically have these columns:
- **Timestamp**: When the email was submitted
- **Email**: Subscriber's email address
- **User Type**: general, salon-owner, product-seller, customer
- **Source**: website, app, etc.
- **Status**: Active, Inactive
- **Notes**: Additional information

## 🔧 Customization Options

### Update Platform Branding
In `src/App.jsx`, modify:
- Platform name (currently "TakeSelfCare")
- Tagline and descriptions
- Contact information
- Social media links
- Color scheme

### Add User Type Selection
You can modify the email form to let users select their type:
```jsx
<select onChange={(e) => setUserType(e.target.value)}>
  <option value="general">General Interest</option>
  <option value="salon-owner">Salon Owner</option>
  <option value="product-seller">Product Seller</option>
  <option value="customer">Customer</option>
</select>
```

### Email Notifications
The Google Apps Script automatically sends you an email notification when someone subscribes. Update the `NOTIFICATION_EMAIL` in the script.

## 🔒 Security Best Practices

### 1. Domain Restrictions (Recommended)
Add this to your Google Apps Script to restrict access:
```javascript
const allowedOrigins = ['https://yourdomain.com', 'https://www.yourdomain.com'];
// Add validation logic
```

### 2. Rate Limiting
The script includes basic rate limiting to prevent spam.

### 3. Data Privacy
- Inform users about data collection
- Add privacy policy link
- Comply with GDPR/local regulations

## 🚨 Troubleshooting

### Common Issues:

1. **"Script not authorized"**
   - Re-run the authorization process in Apps Script
   - Ensure you granted all permissions

2. **"CORS error"**
   - Make sure Web App access is set to "Anyone"
   - Check your domain restrictions

3. **Emails not appearing in sheet**
   - Verify the sheet name matches exactly
   - Check Apps Script logs for errors

4. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify the Google Script URL is correct

### Debug Steps:
1. Open browser developer tools
2. Check Console tab for errors
3. Check Network tab to see if requests are being made
4. Test the Google Apps Script directly using the test function

## 📈 Analytics & Monitoring

### View Subscriber Data
Use the `getAllSubscribers()` function in Apps Script to get all data:
```javascript
// Run this function in Apps Script editor to see all subscribers
function viewAllSubscribers() {
  const result = getAllSubscribers();
  console.log(result);
}
```

### Export Data
Your Google Sheet can be exported as:
- CSV for analysis
- Excel for reporting
- PDF for sharing

## 🎯 Next Steps

1. **Set up your Google Apps Script** (Most Important)
2. **Test the email collection flow**
3. **Customize the design and content**
4. **Deploy to your domain**
5. **Monitor subscriber growth**
6. **Plan your launch campaign**

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Google Apps Script logs
3. Test individual components
4. Verify all URLs and configurations

Your TakeSelfCare platform is ready to collect subscribers and build anticipation for your launch! 🚀
