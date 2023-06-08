**Pomodoro Webpage**

**Goal**: The website will be a multi-user incorporating the pomodoro technique which is a time management method based on a 25 minute stretch of full concentration working with 5 minute intervals of breaks, 
and also 15 minutes break for every 4 loops of the pomodoro timer.  It aims to provide a simple and intuitive user interface that allows users to start, pause, and reset the timer according 
to the predefined intervals. The timer is a pure front-end. In various research it proves that the timer is very effective in its nature to help the user focus more on their work.

**Functionality:**
- Homepage: includes the navigation bar to login, settings, timer and to-do list sections.
- User Authentication: webpage should allow users to create an account, log in, and log out. User authentication ensures that each user can access their own to-do list data.
- Settings section includes the options to change the background theme.
- Timer: webpage display a countdown timer that starts at the beginning of each Pomodoro interval (typically 25 minutes) and counts down to zero. Users should be able to start, pause, and reset the timer.
- To-Do List: the webpage provides a to-do list where users can create, edit, and organize their tasks. Users should be able to add new tasks, mark tasks as completed, and delete tasks.
The to-do list will be related to the database so each account can have different lists.
- Data Persistence: User data, including tasks, should be saved on a server. This ensures that users can access their data from any device after logging in.

**Architecture:**
1. Front-End
- User Interface (UI): HTML and CSS are used to create an intuitive and visually appealing UI. The UI displays the timer, interval progress, and customizable settings. CSS is used for styling and layout.
- Timer Control and Logic: JavaScript is used to handle the timer functionality. It starts, pauses, and resets the timer based on user input. It also manages the interval tracking, triggering breaks, and updating the UI accordingly.
- Customization: JavaScript allows users to customize the background themes.
- Task Management: JavaScript handles the functionality of the to-do list, allowing users to add, edit, and delete tasks. Tasks can be stored in an account.

2. Back-End
- Server: A server-side application handles user authentication, task and timer data storage, and synchronization. It receives and processes API requests from the client, interacting with a database or storage system.
- Database/Storage: A database or storage system is used to store user-specific data. The server interacts with the database to perform CRUD (create, read, update, delete) operations.
