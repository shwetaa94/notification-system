# Notification System

A scalable notification system built with Node.js and Express, utilizing Redis for message handling and microservices architecture. The backend API pushes notification data to Redis, which is then processed by dedicated consumers for email, SMS, and WhatsApp notifications.

## Images

### Architecture Diagram

<img src="https://github.com/user-attachments/assets/6944f702-6b73-4032-8031-e766980742ad" alt="Architecture Diagram" width="800"/>

*Figure 1: Overview of the notification system architecture.*

## Features

- **Microservices Architecture**: Ensures modularity and scalability.
- **Unified API Endpoint**: Send notifications via email, SMS, or WhatsApp using a single API.
- **Redis Integration**: Manages and routes notification messages asynchronously.
- **Dedicated Consumers**: Separate consumers handle email, SMS, and WhatsApp notifications.

## Technologies

- **Node.js**: JavaScript runtime for server-side applications.
- **Express**: Web framework for API development.
- **Redis**: Distributed streaming platform for managing messages.
- **Brevo**: Service provider for email notifications.
- **Tailliwo**: Service provider for SMS and WhatsApp messaging.

## Architecture

1. **Backend API**: Exposes a single endpoint to receive notification requests and pushes notification data to Redis.
2. **Redis**: Handles asynchronous message processing and routing.
3. **Consumers**: Dedicated services for processing notifications:
   - **Email Consumer**: Sends notifications via Brevo.
   - **SMS Consumer**: Sends notifications via Tailliwo.
   - **WhatsApp Consumer**: Sends notifications via Tailliwo.

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- Redis (for local development or a Redis server)
- Brevo and Tailliwo accounts

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/shwetaa94/notification-system.git
    cd notification-system
    ```

2. **Install dependencies:**

    ```bash
    cd api
    npm install
    cd ..
    cd email-consumer
    npm install
    cd ..
    cd whatsapp-consumer
    npm install
    cd ..
    cd sms-consumer
    npm install
    cd ..
    ```

3. **Configuration:**

    Rename the `.env.example` file in `email`, `sms`, and `whatsapp` to `.env` and update the necessary environment variables.

4. **Start Redis:**

    Ensure Redis is running on your local machine or use a Docker cluster.

5. **Run the Prisma Migrate and Generate Commands:**

    ```bash
    npm run prisma:migrate
    npm run prisma:generate
    ```

6. **Run the Backend API:**

    ```bash
    npm start
    ```

7. **Seed the DB**

    ```bash
    npm run seed
    ```

8. **Run Consumers:**

    Start each consumer to process notifications from Redis:

    ```bash
    cd email && npm run start
    cd sms && npm run start
    cd whatsapp && npm run start
    ```

## API Endpoint

### Send Notification

- **Endpoint:** `/api/notifications`
- **Method:** POST
- **Description:** Sends a notification via the specified service (email, SMS, or WhatsApp).
- **Request Body:**
    ```json
    {
      "userId": 1,
      "message": "Your notification message here"
    }
    ```
