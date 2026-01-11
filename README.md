# Weather Forecast App

A React web application that displays a 5-day weather forecast using the OpenWeatherMap API. Built with React, TypeScript, Material-UI (MUI), and Axios.

## Features

- 🌍 **Geolocation Support**: Automatically retrieve weather forecast based on your current location
- 🔍 **City Search**: Search for weather forecasts by city name
- 📅 **5-Day Forecast**: View daily weather forecasts with key information
- ⏰ **Hourly Details**: Drill down into hourly weather details for any selected day
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, readable interface built with Material-UI

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - Component library for consistent, accessible UI
- **Axios** - HTTP client for API calls
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities

## Prerequisites

- Node.js (v18 or higher recommended)
- npm
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd weather-forecast-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenWeatherMap API key:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

**Important Notes:**
- OpenWeatherMap API tokens may take **up to 2 hours** to activate after creation
- Make sure there are **no spaces** before or after the API key in the `.env` file
- Do **not wrap the API key in quotes** in the `.env` file
- You **must restart the development server** after creating or modifying the `.env` file

Example of correct `.env` format:
```
VITE_OPENWEATHER_API_KEY=abcdef1234567890abcdef1234567890
```

**After creating/editing `.env`, always restart the server:**
1. Stop the current dev server (Ctrl+C)
2. Run `npm run dev` again

### 4. Run the application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

### 5. Build for production

```bash
npm run build
```

The built files will be in the `dist` directory.


## Troubleshooting

### "Invalid API key" Error

If you see the error "Invalid API key. Please see https://openweathermap.org/faq#error401", try the following:

1. **Verify your API key is correct:**
   - Check your API key at: https://home.openweathermap.org/api_keys
   - Make sure you copied the entire key (usually 32 characters)
   - Ensure there are no extra spaces or characters

2. **Check your `.env` file format:**
   - The file should be in the root directory (same level as `package.json`)
   - Format should be exactly: `VITE_OPENWEATHER_API_KEY=your_key_here`
   - No quotes around the key
   - No spaces before or after the `=`

3. **API key activation:**
   - New API keys can take **up to 2 hours** to activate
   - Check if your key is activated at: https://home.openweathermap.org/api_keys
   - If it's been less than 2 hours, wait and try again later

4. **Restart the development server:**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart:
   npm run dev
   ```
   Vite only reads `.env` files when it starts, so changes require a restart.

5. **Verify the key is being loaded:**
   ```bash
   npm run check-env
   ```

6. **Check browser console:**
   - Open browser DevTools (F12)
   - Check the Console tab for any error messages
   - The error message should provide more details

### Other Common Issues

**"Network error: Could not reach weather API"**
- Check your internet connection
- Verify OpenWeatherMap API is accessible: https://openweathermap.org/api

**"City not found"**
- Try using the English name of the city
- Include country code if needed (e.g., "London, GB")
- Check spelling

**Geolocation not working**
- Ensure you granted location permissions to your browser
- HTTPS is required for geolocation in production (localhost works for development)
- Some browsers/devices may not support geolocation

## Running Tests

Run unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## API Configuration

This app uses the [OpenWeatherMap 5-day Forecast API](https://openweathermap.org/forecast5).

### Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to API keys section
4. Generate a new API key
5. Copy the key and add it to your `.env` file

### API Usage

The app makes requests to:
- `GET /forecast` - 5-day weather forecast (3-hour intervals)

The API key is automatically included in all requests via Axios configuration.

## AI-First Development Notes

This project was developed using an AI-first approach with tools like Cursor, ChatGPT. Here's how AI was utilized:

### AI-Assisted Areas

1. **Component Structure**: Initial component structure and MUI integration patterns were suggested by AI, then manually optimized for better UX and performance
2. **Type Definitions**: TypeScript interfaces for OpenWeatherMap API responses were AI-generated, then refined to match exact requirements
3. **Error Handling**: AI suggested error handling patterns, which were then customized for better user experience
4. **Test Structure**: Test setup and initial test cases were AI-assisted, with manual refinement for edge cases

### Verification and Refinement

- All AI-generated code was reviewed manually
- API integrations were tested against actual OpenWeatherMap responses
- Component rendering and interactions were verified in the browser
- Error scenarios were manually tested (API failures, geolocation denials, etc.)
- Test coverage was expanded beyond initial AI suggestions