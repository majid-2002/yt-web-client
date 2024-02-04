# Use node:18 as the base image for building
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables from build args
ARG NEXT_PUBLIC_APIKEY
ARG NEXT_PUBLIC_AUTHDOMAIN
ARG NEXT_PUBLIC_PROJECTID
ARG NEXT_PUBLIC_APPID
ARG NEXT_PUBLIC_MESSAGINGSENDERID
ARG NEXT_PUBLIC_STORAGEBUCKET
ARG NEXT_PUBLIC_MEASUREMENTID

ENV NEXT_PUBLIC_APIKEY=${NEXT_PUBLIC_APIKEY}
ENV NEXT_PUBLIC_AUTHDOMAIN=${NEXT_PUBLIC_AUTHDOMAIN}
ENV NEXT_PUBLIC_PROJECTID=${NEXT_PUBLIC_PROJECTID}
ENV NEXT_PUBLIC_APPID=${NEXT_PUBLIC_APPID}
ENV NEXT_PUBLIC_MESSAGINGSENDERID=${NEXT_PUBLIC_MESSAGINGSENDERID}
ENV NEXT_PUBLIC_STORAGEBUCKET=${NEXT_PUBLIC_STORAGEBUCKET}
ENV NEXT_PUBLIC_MEASUREMENTID=${NEXT_PUBLIC_MEASUREMENTID}

# Build the application
RUN npm run build

# Use node:18 as the base image for the final image
FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the listening port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
