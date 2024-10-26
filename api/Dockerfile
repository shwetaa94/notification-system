FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package.json ./
COPY tsconfig.json ./

# Install dependencies and TypeScript globally
COPY . .
RUN npm install && npm install -g typescript

# Copy the Prisma schema files if you're using Prisma
# COPY prisma ./prisma

# Copy the rest of the files

# Set environment variables
ENV DATABASE_URL="postgres://postgres:password@postgres:5432/notifications"
ENV EMAIL="shwetasinghh9416@gmail.com"
ENV PHONE="+918278965764"

# Generate Prisma client (no migration here)
RUN npx prisma generate

# Expose the port
EXPOSE 8080

# Compile the TypeScript code
RUN tsc

# Run migrations and seed data at runtime
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && node dist/index.js"]
