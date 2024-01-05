FROM node:latest

# root/ node
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./client ./client
COPY ./server ./server

# frontend
WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 4000 
EXPOSE 3000 

# Command to start the both frontend and backend
CMD ["npm", "run", "dev"]
