//packages
require('dotenv').config();
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const analytics = google.analytics('v3');

//constants
const trackingId = process.env.TRACKING_ID;
const pathToCSVFile = path.join(__dirname, '../exported_report.csv');
const serviceAccountKeyFile = path.join(__dirname, './config/serviceAccountKey.json');

//checkers

//checkers: file checker
const isSubjectListFileExists = !fs.existsSync(pathToCSVFile);
if (isSubjectListFileExists) {
  throw new Error(`You forgot to export "exported_report.csv" inside of the root folder of the project.`);
}
const isServiceAccountKeyFileExists = !fs.existsSync(pathToCSVFile);
if (isServiceAccountKeyFileExists) {
  throw new Error(`You forgot to add "serviceAccountKey.json" inside of "./src/config" folder.`);
}

//checkers: environmental variables
if (!trackingId || trackingId === 'UA-XXXXXXXX-Y') {
  throw new Error(`You forgot to set environmental variable TRACKING_ID, you either have to define it from your OS or set it inside of ".env" file.`);
}

const csvToObjectArray = () => {
  const fileData = fs.readFileSync(pathToCSVFile, 'utf8');
  const csvFilteredData = fileData.split('\n\n')[1];

  return csv()
    .fromString(csvFilteredData)
    .then(rows => {
      return rows.map(row => {
        const clientId = row['Client Id'] || row['Client ID'];
        const userId = row['User Id'] || row['User ID'];

        return {
          clientId,
          userId
        };
      });
    });
};

let progressCount = 0;
const userDeletionRequest = async (dataRow, total) => {
  const type = dataRow.clientId ? 'CLIENT_ID' : 'USER_ID';
  const userId = dataRow.clientId || dataRow.userId;

  try {
    const res = await analytics.userDeletion.userDeletionRequest.upsert({
      requestBody: {
        id: {
          type,
          userId
        },
        kind: 'analytics#userDeletionRequest',
        webPropertyId: trackingId,
      },
    });

    console.log(`${++progressCount} / ${total} is done, ${type}: ${userId}`);

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const executor = async () => {
  const authClient = await google.auth.getClient({
    keyFile: serviceAccountKeyFile,
    scopes: 'https://www.googleapis.com/auth/analytics.user.deletion'
  });
  google.options({auth: authClient});

  const listOfData = await csvToObjectArray();

  console.log(`Total: ${listOfData.length}`);
  console.log(`=============================`);

  await Promise.all(listOfData.map(row => {
    return userDeletionRequest(row, listOfData.length);
  }));

  console.log(`=============================`);
  console.log(`DONE: ${listOfData.length}`);
};

executor();