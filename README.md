# **Patient Management Portal \- Frontend**

This repository contains the React.js frontend application for the Patient Management Portal. It provides a responsive user interface for viewing, adding, editing, and deleting patient records, with secure authentication and role-based access control.

## **Table of Contents**

1. [Project Description](#bookmark=id.r8269ehkkwod)
2. [Features](#bookmark=id.jyiku7l49fjm)
3. [Local Setup](#bookmark=id.1m32a2azbb8c)
   - [Prerequisites](#bookmark=id.nfbep5mu762a)
   - [Backend Setup (Assumed Separate)](#bookmark=id.v5afrx47p0c7)
   - [Frontend Setup](#bookmark=id.5xszj583gkfd)
   - [Running the Application Locally](#bookmark=id.y5pc1ncjbcla)
   - [Running the Docker Container](#bookmark=id.410tj1da2ub7)

## **1\. Project Description**

The Patient Management Portal is a web application designed to help healthcare professionals manage patient records efficiently. This frontend application is built with React, TypeScript, ShadCN and Tailwind CSS, providing an interactive, intuitive, and responsive user experience. It consumes a RESTful API for data persistence and authentication.

## **2\. Features**

- **Authentication:** Secure user login using JWT tokens.
- **Role-Based Access Control:** Routes and UI elements are dynamically displayed based on user roles (e.g., Admin, Employee).
- **Patient List:** Responsive table display of patient records with pagination.
- **Add Patient:** Administrators can add new patient records via a validated form.
- **Edit Patient:** Authorized users (Admin/Employee) can edit existing patient details through a dedicated dialog with form validation.
- **Delete Patient:** Authorized users (Admin/Employee) can delete patient records with a confirmation dialog.
- **Responsive Design:** Optimized for seamless viewing and interaction across desktop, tablet, and mobile devices.
- **Notifications:** Snackbar/toast notifications for successful operations and errors.
- **Client-Side Validation:** Form validations implemented using React Hook Form and Yup for better UX.

## **3\. Local Setup**

### **Prerequisites**

Before you begin, ensure you have the following installed on your machine:

- **Node.js:** Version 20.x or higher (LTS recommended). You can use a Node Version Manager (like nvm) for easy version switching.
- **npm** (Node Package Manager): Comes with Node.js.
- **Git:** For cloning the repository.

### **Backend Setup (Assumed Separate)**

This frontend application relies on a separate backend API. Please ensure your backend is set up and running before starting the frontend.

**General steps for backend setup (refer to backend's specific README for details):**

1. **Clone the backend repository:**  
   git clone https://github.com/aahadaazar/patients-api  
   cd patients-api
2. **Install backend dependencies:**  
   npm install
3. **Start the backend server:**  
   npm run start:dev
   - Ensure the backend is running on http://localhost:3000

### **Frontend Setup**

1. **Clone this frontend repository:**  
   git clone https://github.com/aahadaazar/patients-app  
   cd patients-app

2. **Install frontend dependencies:**  
   npm install

### **Running the Application Locally**

1. **Start the backend server** (refer to "Backend Setup" above).
2. Start the frontend development server:  
   Open your terminal, navigate to the frontend directory, and run:  
   npm run dev

   This will start the development server at http://localhost:3001. Open this URL in your web browser.

## **4\. Docker Setup**

### **Docker Prerequisites**

- **Docker Desktop:** Installed and running on your system.

### **Building the Docker Image**

1. **Navigate to the frontend directory in your terminal.**  
   cd frontend

2. **Build the Docker image:**  
   docker build \-t patients-app .

   - This might take a few minutes the first time.

### **Running the Docker Container**

Once the image is built, you can run it:

docker run \-p 80:80 patients-app

- This command maps port 80 on your host machine to port 80 inside the container.
- You should now be able to access the Dockerized frontend in your web browser at http://localhost:80.
