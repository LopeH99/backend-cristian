# Use an official Node.js image as the base image
FROM node:16

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app source code to the container
COPY . .

# Expose the port your app is listening on
EXPOSE 3000

# Command to run your app
#CMD [ "sh", "-c", "npx nodemon -L index.js" ]
CMD npx prisma migrate dev --name initial && npx prisma db seed && npx prisma studio & npx nodemon -L index.js

