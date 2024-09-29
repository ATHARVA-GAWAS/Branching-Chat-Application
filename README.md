# ChatGPT Clone with Message Branching

## Overview

This project is a simplified ChatGPT clone built using **Next.js**, **TypeScript**, and **Supabase** as the backend database. The primary focus of the project is to implement **message branching** functionality, allowing users to:

- Create a basic chat interface.
- Edit original prompts.
- View previous versions of prompts.
- Display related follow-up messages for each branch of the conversation.

## Features

- **Basic Chat Interface**: A simple interface for users to send and receive messages.
- **Message Branching**: Allows users to:
  - Create branches from a particular message.
  - View all follow-up messages for each branch.
  - Go back and edit previous prompts while preserving branches.
- **Supabase Integration**: Supabase is used for data storage and retrieval, ensuring all message history, branches, and user actions are stored in the database.
- **Real-time Updates**: Chat messages and branches update in real-time.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) - React framework for building server-rendered React apps.
  - [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript, improving development speed and reducing bugs.
  - [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for styling the app.
  
- **Backend**:
  - [Supabase](https://supabase.com/) - An open-source Firebase alternative that provides real-time databases, authentication, and storage.

## System Design

### Architecture Overview

- **Frontend**: The chat interface is implemented using React components in Next.js. It uses Supabase’s real-time database functionality to fetch, store, and update chat data.
  
- **Backend**: Supabase is responsible for storing user messages and branches. Real-time functionality in Supabase updates messages across clients without requiring a page refresh.

### Component Breakdown

- **`Chat.tsx`**: The main chat component responsible for rendering messages and handling user inputs.
- **`BranchMessage.tsx`**: Component to manage message branching and display related follow-up messages.
- **`supabaseClient.ts`**: Supabase client for handling database connections.

### Database Schema (in Supabase)

- **Messages Table**:
  - `id` (integer, primary key)
  - `content` (text) - The content of the message.
  - `created_at` (timestamp) - Time when the message was created.

- **Branches Table**:
  - `id` (integer, primary key)
  - `message_id` (foreign key to Messages table) - The original message ID from which the branch was created.
  - `content` (text) - Content of the branch message.
  - `created_at` (timestamp) - Time when the branch was created.

### API Design

- **`/api/messages`**: Handles fetching and posting messages.
- **`/api/branches`**: Handles creating branches and fetching branch messages related to a specific message.

### Message Branching

Message branching is implemented by associating follow-up messages with a specific message ID, allowing users to create alternative paths of conversation.

## Getting Started

### Prerequisites

Before you start, ensure you have the following installed on your local machine:

- Node.js (>= 14.x)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chatgpt-clone.git
   cd chatgpt-clone
2. Install dependencies:

    ```bash
    npm install

3. Set up Supabase:

   a. Create a Supabase account.

   b. Create a new project in Supabase.

   c. Copy your Supabase API URL and API Key.

   d. Set them up in .env.local file:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url

    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

4.Set up the database tables in Supabase by running SQL commands:
```SQL
    CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE branches (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES messages(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
    );
```
5. Run the development server:
```bash
    npm run dev
```
## Usage
- Send Messages: Type a message and hit send.
- Create Branches: Click "Branch" next to any message to create a follow-up branch for that specific message.
- View Branches: Navigate through the branches to view previous versions and related follow-ups.
## Potential Improvements
- Scalability: Optimizing the chat for higher concurrent users with real-time syncing.
- Performance: Implementing lazy loading for messages to handle large conversations.
- Branching UI: Improving the user interface to make branching easier and more intuitive.
## Video Presentation
Include a short video explaining:

- Architectural decisions and message branching.
- Supabase integration.
- Challenges faced and how you overcame them.
## Contributing
Contributions are welcome! Please fork the repo and submit a pull request for any changes you’d like to propose.