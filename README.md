# ga-pii-cleaner #

This script is intended to clean up PII (personally identifiable information) related client data from Google Analytics.

### Prologue ###

It's quite a problem if you have to clean up multiple records manually, let's say if you have too many records to clean up, that will take days to finish the work, however with this script you can accomplish the task within a minutes.

### Preparation ###

#### Authorization ####
1. Read and get acquainted with the [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) topic,
2. Give the service account Editor's permissions,
3. Enable Google Analytics's API,
4. Export the service account json key file.
5. Place `serviceAccountKey.json` inside of `./src/config` folder of the project,

#### Google Analytics ####

6. Set Google Analytics' tracking id as environmental variable `TRACKING_ID` (you either have to define it from your OS or set it inside of `.env` file),
7. Add in Google Analytics' "Admin" settings page's "Admin" tab's "View" subtab's "View User Management" section the `client_email` email address of the service account.
  

### How to use ###

#### Google Analytics ####

1. In Google Analytics' create a new segmet of filtration where you'll define your own rules of filtration,
2. In Google Analytics' "Audience" section's "User Explorer" subsection export the cliend id/user id list from Google Analytics as CSV file `exported_report.csv`.

#### Cleaning up the data ####

3. Place `exported_report.csv` inside of the root folder of the project,
4. Run `npm start` to initiate,
5. Wait until you'll get the confirmation that the job is done.
