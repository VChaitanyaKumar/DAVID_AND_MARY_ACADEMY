1. Splash Screen
Purpose: Initial screen that appears when the app is launched.

Features: App logo/branding and possible animation.

Navigation: Automatically transitions to Home Page after a few seconds.


3. Home Page
Purpose: Main dashboard after login.

Features:

Greetings ("Hi, Anaya")

Cards or buttons to access key features:

Timetable

Tasks

Notes

Reminders

Upcoming Exams

Profile Page

Navigation: Acts as central hub linking to all other pages.

4. Timetable Page
Purpose: View the weekly class schedule.

Features:

List/grid of classes by day/time.

"+" Button: Used to add new class.

Navigation:

Pressing "+" → opens Add Class Page.

5. Add Class Page
Purpose: Add a class to the timetable.

Fields: Subject, day, time, teacher, room number, etc.

Navigation:

After saving → returns to Timetable Page with new class added.

6. Tasks Page
Purpose: Manage tasks/homework.

Features:

List of tasks (title, due date, status).

"+" Button: Opens the Add Task Page.

Navigation:

"+" → goes to Add New Task Page.

7. Add New Task Page
Purpose: Create a new task.

Fields: Task name, description, subject, due date.

Navigation:

On save → returns to Tasks Page with updated list.

8. Notes Page
Purpose: Store handwritten or typed notes.

Features:

List of notes.

"+" Button to add a new note.

Navigation:

"+" → opens Add Notes Page.

9. Add Notes Page
Purpose: Create and save a new note.

Fields: Note title, content.

Navigation:

After saving → returns to Notes Page.

10. Reminder Settings (from Home Page)
Purpose: Set custom reminders for tasks, exams, etc.

Features:

Time & date picker

Type of reminder

Navigation:

Can be accessed from Home Page via settings icon or reminder section.

11. Upcoming Exams Page
Purpose: View and manage exam schedules.

Features: List of upcoming exams with subjects, dates.

Navigation:

"+" → opens Add Exams Page.

12. Add Exams Page
Purpose: Add exam details.

Fields: Subject, date, time, syllabus.

Navigation:

After save → returns to Upcoming Exams Page with updated list.

13. Profile Page
Purpose: User account details and settings.

Features:

Name, email, profile picture

Option to logout or update info

Navigation:

Accessible from Home Page (usually via avatar or profile icon)

🔁 Overall Flow Summary:
pgsql
Copy
Edit
Splash Screen 
   ↓ 
Signin/Signup 
   ↓ 
Home Page 
   ↙     ↓      ↓       ↓       ↓        ↘
Timetable Tasks Notes Exams Reminders Profile
   ↓        ↓     ↓      ↓
Add Class  Add Task Add Note Add Exam