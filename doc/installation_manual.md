1. Download the zip file with the file name 'src.zip'

2. Install XAMPP:
   - Visit the official XAMPP website at https://www.apachefriends.org/download.html.
   - Choose the appropriate version for your laptop and follow the installation instructions.

3. Start XAMPP services:
   - For MAC Users:
     - Launch XAMPP and navigate to 'Manage Servers'.
     - Start the 'MySQL Database' and 'Apache Web Server' services.
     - Verify that the status lights turn green, indicating the services are running.

   - For Windows Users:
     - Open the 'Control Panel' and locate XAMPP.
     - Start the 'MySQL Database' and 'Apache Web Server' services.
     - Ensure that the status lights turn green, indicating the services are running.

4. Move the 'src' folder to the appropriate location:
   - For MAC Users:
     - Open Finder and go to Applications -> XAMPP -> htdocs.
     - Copy the 'src' folder and paste it inside the 'htdocs' directory.

   - For Windows Users:
     - Open File Explorer and navigate to Local Disk (C:) -> xampp -> htdocs.
     - Paste the 'src' folder inside the 'htdocs' directory.

5. Set up the database:
   - Open your web browser and enter 'localhost/phpmyadmin/' in the address bar.
   - On the left-hand side of the page, select 'New' to create a new database.
   - Name the database as 'todo_list'.
   - Import file 'todo_list-5.sql' inside the databse

6. Access the Pomodoro website:
   - Open your web browser and enter 'localhost/src/home.php' in the address bar.
   - Press Enter to access the Pomodoro website.

Note:
You can use the website only when you register an account and log in. Creating an account will allow you to save your to-do lists and use other features for future reference.
