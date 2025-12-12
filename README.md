# Notification System

A Node.js/Express-based notification system that accepts notification requests through an API, enqueues them (Redis), and processes them with independent consumers for different channels (Email, SMS, WhatsApp). Prisma is used for DB migrations / models. Third-party providers (e.g., Brevo for email and Tailliwo for SMS/WhatsApp) are used by each consumer to actually send messages. The repo is Docker-friendly and includes consumer services separated by concern.

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

## Architecture Overview

1. Backend API receives notification requests and pushes them to Redis.
2. Redis acts as a queue for asynchronous processing.
3. Channel-specific consumers read from Redis:
   - Email Consumer
   - SMS Consumer
   - WhatsApp Consumer
4. Each consumer sends the notification using its respective provider.


# Step-by-Step Notification Flow
1. Backend API receives notification requests and pushes them to Redis.
2. Redis acts as a queue for asynchronous processing.
3. Channel-specific consumers read from Redis:
   - Email Consumer
   - SMS Consumer
   - WhatsApp Consumer
4. Each consumer sends the notification using its respective provider.
1. Client sends a POST request to `/api/notifications`.
2. API validates the request payload.
3. API stores a notification record in the database.
4. API pushes one or more jobs (one per channel) into Redis.
5. The respective consumer (email, sms, whatsapp) picks the job from Redis.
6. Consumer loads the template and merges dynamic data.
7. Consumer sends the message using Brevo or Tailliwo.
8. Consumer updates the notification status in the database.
9. Failed messages may be retried. After maximum retries, they are moved to a Dead Letter Queue (DLQ).

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- Redis (for local development or a Redis server)
- Brevo and Tailliwo accounts

### Installation



#### With Docker

1. **Clone the repository:**

    ```bash
    git clone https://github.com/shwetaa94/notification-system.git
    cd notification-system
    ```

2. **Build Docker Images:**

    Ensure Docker is installed and running on your machine. Then, build the Docker images for each service:

    ```bash
    docker-compose build
    ```

3. **Configuration:**

    Rename the `.env.example` file to `.env` and update the necessary environment variables.

4. **Start Services:**

    Use Docker Compose to start all services, including Redis:

    ```bash
    docker-compose up
    ```

5. **Run the Prisma Migrate and Generate Commands:**

    Execute the following commands inside the running API container:

    ```bash
    docker-compose exec api npm run prisma:migrate
    docker-compose exec api npm run prisma:generate
    ```

6. **Seed the DB:**

    Execute the following command inside the running API container:

    ```bash
    docker-compose exec api npm run seed
    ```

7. **Access the API:**

    The API should be accessible at `http://localhost:8080/api/notifications`.

#### Without Docker

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
