# Chat App

A simple and interactive chat application designed to make online communication easier and more engaging. With features like real-time messaging, group chat management, and an admin dashboard, Chat App brings people closer together.

---

## Features

1. **User Registration/Login**:  
   - Secure registration and login using unique usernames.  

2. **Search Users**:  
   - Quickly find and connect with other registered users.  

3. **Friend Requests**:  
   - Send and receive friend requests, with notifications for incoming requests.  

4. **Friend Management**:  
   - Accept or decline friend requests to manage your social circle.  

5. **Chat List**:  
   - View a list of active friends and conversations.  

6. **Real-Time Messaging**:  
   - Exchange messages and attachments using a responsive chat interface.  

7. **Group Chats**:  
   - Create group chats with **3 to 100 members**.  
   - Group admins can rename the group, manage members, and delete the group if necessary.  

8. **Admin Dashboard**:  
   - A secure admin dashboard to monitor users, messages, and chats (accessible with a secret key).  

9. **Unfriend/Delete Chat**:  
   - Remove a chat or unfriend a user directly from the chat list.  

10. **Flexible Group Management**:  
    - Members can leave groups. Admins can assign new leadership automatically if the admin leaves.  

---

## Installation and Setup

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed (version 16+ recommended). [Download Node.js](https://nodejs.org/)
2. **Package Manager**: Use npm (comes with Node.js) or yarn.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/chat-app.git
cd chat-app
```

---

### Step 2: Install Dependencies

#### 2.1 Client-Side Setup
Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

#### 2.2 Server-Side Setup
Navigate to the server directory and install dependencies:

```bash
cd ../server
npm install
```

---

### Step 3: Configure Environment Variables

#### 3.1 Client-Side

1. Navigate to the client folder.
2. Create a `.env` file and define any necessary variables.

   Example:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

#### 3.2 Server-Side

1. Navigate to the server folder.
2. Create a `.env` file and set up the required variables:
   ```env
   PORT=5000
   SECRET_KEY=your_secret_key
   MONGO_URI=mongodb://localhost:27017/chatapp
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

---

### Step 4: Run the Application

#### 4.1 Start the Server
Navigate to the `server` directory and run the server:

```bash
npm start
```

The server will start on `http://localhost:5000` (or the port defined in `.env`).

#### 4.2 Start the Client
Navigate to the `client` directory and run the client:

```bash
npm run dev
```

The client will start on `http://localhost:5173` (or the port defined by Vite).

---

### Step 5: Open in Browser

1. Open your browser and visit the client URL, typically:
   ```
   http://localhost:5173
   ```
2. Interact with the application.

---

### Additional Notes

1. **Client Build for Production**:
   To build the client for production:
   ```bash
   npm run build
   ```
   The build output will be located in the `dist` folder.

2. **Server in Production**:
   For production, consider using a process manager like [PM2](https://pm2.io/) to run your Node.js server:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

3. **Database**:
   Ensure MongoDB is running locally or remotely accessible through the URI defined in `.env`.

4. **Socket.IO**:
   The client and server communicate in real-time using Socket.IO. Ensure the server URL is properly configured in the client.

---

## Contributing

We welcome contributions! Here’s how you can get started:  
1. Fork the repository.  
2. Clone your forked repository.  
3. Create a new branch (`git checkout -b feature-name`).  
4. Make your changes and commit them (`git commit -m "Add feature"`).  
5. Push your changes to the forked repository.  
6. Submit a pull request.  

Please ensure your changes are well-documented and tested.  

---

Feel free to reach out with any questions or ideas to improve this project!

