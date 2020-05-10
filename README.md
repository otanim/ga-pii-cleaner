# README #

This script is intended to clean up PII related client data from Google Analytics.

### Preparation ###

1. Read and get acquainted with the [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)
2. Place `serviceAccountKey.json` inside of the root folder of the project,

### How to use ###

1. Export the cliend id/user id list from Google Analytics,
2. Place `exported_report.csv` inside of the root folder of the project,
3. Run `npm start` to initiate,
4. Wait until you'll get the confirmation that the job is done.
