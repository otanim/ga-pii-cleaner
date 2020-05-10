# ga-pii-cleaner #

This script is intended to clean up PII related client data from Google Analytics.

### Preparation ###

#### Authorization ####
1. Read and get acquainted with the [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) topic.
2. Export the service account json file.
3. Place `serviceAccountKey.json` inside of `./src/config` folder of the project,

#### Google Analytics ####

4. Set Google Analytics' tracking id as environmental variable `TRACKING_ID` (you either have to define it from your OS or set it inside of `.env` file).  
  

### How to use ###

#### Google Analytics ####

1. In Google Analytics' create a new segmet of filtration where you'll define your own rules of filtration,
2. In Google Analytics' "Audience" section's "User Explorer" subsection export the cliend id/user id list from Google Analytics as CSV file `exported_report.csv`.

#### Cleaning up the data ####

3. Place `exported_report.csv` inside of the root folder of the project,
4. Run `npm start` to initiate,
5. Wait until you'll get the confirmation that the job is done.
