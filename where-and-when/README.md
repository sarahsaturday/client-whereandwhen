# Where & When - Client-side README

## Project Description

**Where & When** is a client-side application designed for Al-Anon Family Services (AFS) of Middle Tennessee. They are a non-profit organization that maintains a directory of local support group meetings, and this application aims to streamline the management of this directory, replacing the current manual process.

Currently, AFS of Middle TN manages the meeting information using Google Sheets, where group representatives submit changes via a Google Form, and the office manager manually updates the directory. This process is time-consuming and requires proficiency in Excel, making it challenging to onboard new office managers. **Where & When** will transform this process by migrating the data into a database and providing a user-friendly interface for group representatives and office managers to manage meetings efficiently.

## Project Links

- [ERD (Entity-Relationship Diagram)](https://dbdiagram.io/d/64f2483502bd1c4a5ed3c41a)
- [Wireframe](https://sketchboard.me/HDY973P3tdLQ)

## Installation

To run the application locally, ensure you have the following dependencies installed:

- React
- JSX (if not included with React)

Clone this repository to your local machine and install the necessary dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
npm install

## Usage

### Viewing Meetings

- **As a visitor or user**, you can view meeting details in the meeting directory:
  1. Go the the homepage of the site.
  2. A list of meetings will appear, ordered by day and time.

### Searching for Meetings

- **As a visitor or user**, you can search for meetings in the meeting directory:
  1. Enter search parameters into the search bar on the homepage.
  2. A filtered list of meetings matching those parameters will appear.

### Adding a New Meeting

- **As a group representative (user)**, you can add a new meeting to the directory:
  1. Log in.
  2. Click "Add Meeting."
  3. Fill out the form to add meeting details to the directory.

### Editing Meeting Details

- **As a group representative (user)**, you can edit any meeting's details in the directory:
  1. Log in.
  2. Click "Edit" on a meeting.
  3. Edit the details for that meeting.

### Deleting a Meeting

- **As a group representative (user)**, you can delete any meeting(s) from the directory:
  1. Log in.
  2. Click "Delete" on a meeting.
  3. The meeting will be removed from the directory.

### Office Manager (Staff) Actions

- **As an office manager (staff)**, you can also manage any meeting(s) in the directory:
  - You can edit any meeting.
  - You can delete any meeting.

## Configuration

The application relies on a local API for its functionality. Ensure that the API is properly configured for the application to work correctly.

## Screenshots or Demo

For a visual demonstration of the application, please refer to this [demo video](https://www.loom.com/share/b21724a4f99f4a67a6fa75cc8495bf41?sid=a704ecc8-1bba-467e-a439-665cadf28e65).

---

Thank you for using **Where & When**! If you have any questions or encounter issues, please don't hesitate to reach out.
