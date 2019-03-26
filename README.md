# RecoveryBot Fitbit App

<p align="center"><img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/000/765/255/datas/gallery.jpg" height="300px"></p>

*Made for TreeHacks 2019 hackathon. Winner of "Most Impactful" award.*

This is the Fitbit app for RecoveryBot. It will send an alert to the user's contact person if the user's heart rate goes above certain threshold.

[More info about RecoveryBot](https://devpost.com/software/recovery-bot)

## Install

**Prerequisites:**
* [Node & NPM](https://nodejs.org/en/)
* Fitbit Ionic Watch / [Fitbit Simulator](https://dev.fitbit.com/getting-started/)

```bash
# Clone this repository.
$ git clone https://github.com/RecoveryBot/fitbit-app.git

# Install dependencies.
$ npm install

# Duplicate the config example file and fill it out.
$ cp config.example.js config.js
$ nano config.js

# Run the Fitbit CLI.
$ npx fitbit

# Connect to device or simulator.
fitbit$ connect device
fitbit$ connect phone

# Build and run app.
fitbit$ build
fitbit$ install
```

*Note: The RecoveryBot's Express server must be running while using the app.*

## License

[MIT](https://github.com/RecoveryBot/fitbit-app/blob/master/LICENSE)
