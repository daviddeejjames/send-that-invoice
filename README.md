# send-that-invoice 📤

Small NodeJS app that automatically emails a file from a given Dropbox folder.

## Uses
- [Dropbox JS SDK](https://github.com/dropbox/dropbox-sdk-js)
- [Nodemailer](https://github.com/nodemailer/nodemailer)
- [node-cron](https://github.com/kelektiv/node-cron)

## How It Works 🔧
The application was made for a very specific use case, however the general problem it resolves is to automate sending an invoice to a client.

This invoice is usually handwritten, scanned and uploaded to Dropbox. In the past, this would be then manually sent via email.

This application rectifies this by checking if the file has been uploaded to Dropbox and proceeds to generate the email and send it to the specific client as an email with an attachment, based on the uploaded file name prefix.

## Build & Usage :alien:
1. Clone repo
1. Set environment variables in ```variables.env```
1. Set at least one ```person.json``` in ```data``` folder
1. ```npm install```
1. ```npm start```

## Helpful Links
- [Dropbox API Docs](http://dropbox.github.io/dropbox-sdk-js/)