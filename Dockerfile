FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY student-portal-frontend/ .  
RUN npm install && npm run build

FROM node:18 AS backend-build
WORKDIR /app/backend
COPY student-portal-backend/ .  
RUN npm install

FROM node:18
WORKDIR /app

COPY --from=frontend-build /app/frontend/build /app/frontend/build

COPY --from=backend-build /app/backend /app/backend

COPY student-portal-backend/.env /app/backend/.env

EXPOSE 5000  

WORKDIR /app/backend

RUN npm install --production

# Start Backend and Serve Frontend using Express
CMD ["node", "index.js"]
