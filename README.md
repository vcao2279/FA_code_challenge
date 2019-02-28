1. Pull 1000 names from some public API either in front-end code or back-end. A couple possibilities would be Facebook's Graph API (https://developers.facebook.com/docs/graph-api/reference) and LinkedIn's API (https://developer.linkedin.com/docs/rest-api).

2. Store the results from step 1 locally (we suggest a SQLite database, but you can use any format you'd like). This should be run on the back-end (i.e. imagine this is running on a server where we need the data on a database on the server).

3. Develop a simple webpage that will display 100 names in a table (out of 1000).

4. Add email and phone columns to the webpage table. Then, provide a button for each table entry that allows you to manually enter a phone and/or email address. Add some basic validation for the phone and/or email address (e.g. '123' would be rejected as a phone number). Validation can be run on either front-end or back-end. The data should be stored in storage you set up in step 2.

5. Add buttons that allow you to sort the table by name or email address.

6. Add a search function to the table.

7. Add a button that allows you to export the table data to a .csv download file. The .csv file should reflect the current status of the table (including sort order and search results).
