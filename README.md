# Insights Agent Desktop App

This repository houses the code for the Insights Agent desktop application. This Electron-based application is designed to be used by individuals who have signed up and been selected to participate in a research study in which participants agree to download the application and enable data collection including the following data points.

- device type / operating system
- application names
- tab names (scrubbed for PII)
- domain names
- connectivity (connected to wifi or not)
- device type
- timestamps

Raw data is anonymized and only persisted for a short period of time before it is aggregated and destroyed.

The code is setup to be hosted open source on Github in order to leverage the free service [update.electronjs.org](https://github.com/electron/update.electronjs.org) for auto-updating production applications.

## Dependencies
- electron
- electron-forge
- update-electron-app
- electron-squirrel-startup

## Development

1. Close repo
```
git clone git@github.com:specollective/insights-agent-desktop-app.git
```

2. Install dependencies
```
npm install
```

3. Start development app
```
npm start
```

4. Run unit tests
```
npm test
```

## Deployment

Testing builds locally

Create a .env file.
```
touch .env
```

Add the following environment variables with your developer credentials.
```
APPLE_ID=[YOUR APPLE ID]
APPLE_ID_PASS=[YOUR APP SPECIFIC PASSWORD]
APPLE_IDENTITY=Developer ID Application: [YOUR NAME] ([YOUR DEVELOPER ID])
CSR_PASS=[CSR_PASS]
DEVELOPMENT=true
GITHUB_TOKEN=[GITHUB_TOKEN]
BACKEND_API_URL=https://example.com
```

## Distribution

🚧 This section us under construction and is considered incomplete. 🚧

### MS Windows

The Insights Agent desktop application has initially been developed to study usage of Microsoft Windows computers. The application uses Electron Forge to sign the software with an Extended Validation (EV) token. Currently, this requires building the application on a computer with a thumb-drive with the EV token client.

**Manual code signing process**

This section assumes you have the EV token device and credentials stored in a password manager.

Perform dry run
```
npm run publish:dry-run
```

Sign executable
```
node_modules\electron-winstaller\vendor\signtool.exe sign /a /f "ev-cert.pfx" /p "PASSWORD" "out\insights-agent-desktop-app-win32-x64\insights-agent-desktop-app.exe"
```

Publish from dry-run
```
npm run publish:from-dry-run
```

### MacOSX

The application can run on OSX. This flow is setup to automatically build and sign the app as part of CI.
