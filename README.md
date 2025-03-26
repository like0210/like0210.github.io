# Instagram Graph API Integration

## Overview
This website has been updated to use Instagram Graph API to display real Instagram posts in the Instagram section of the website.

## Setup Instructions

### 1. Create a Facebook Developer Account
If you don't already have one, create a developer account at [Facebook for Developers](https://developers.facebook.com/).

### 2. Create a Facebook App
1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Click "Create App"
3. Select "Consumer" as the app type
4. Fill in the required information and create the app

### 3. Set Up Instagram Basic Display
1. From your app dashboard, click "Add Products" in the left sidebar
2. Find "Instagram Basic Display" and click "Set Up"
3. Follow the setup instructions

### 4. Connect Your Instagram Account
1. In the Instagram Basic Display settings, add your Instagram account
2. Follow the authorization flow

### 5. Generate an Access Token
1. Once your Instagram account is connected, you can generate a long-lived access token
2. This token will be valid for 60 days and can be refreshed

### 6. Update the Website Code
Replace the placeholder values in the `initInstagramFeed()` function in `js/orris-london-js.js`:

```javascript
// Instagram Graph API configuration
const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Replace with your actual access token
const userId = 'YOUR_INSTAGRAM_USER_ID'; // Replace with your Instagram user ID
```

## Troubleshooting

### Token Expiration
If the Instagram feed stops working, your access token may have expired. Generate a new token following the steps above.

### API Rate Limits
Instagram Graph API has rate limits. If you exceed these limits, the API will return an error. The website is designed to fall back to placeholder images if this happens.

### Content Not Displaying
Ensure your Instagram account is public and has posts. Private accounts or accounts with no posts will not display content.

## Resources
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api/)
- [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api/)