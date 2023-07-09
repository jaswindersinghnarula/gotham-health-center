# Tech Stack Used

- React Js (MUI library)
- Express Js
- Prisma (ORM)
- Postgres

# Folders and installation

- Database
  - Make "data" folder and run docker compose command. This will spin up Postgres database
  - `<path to root>\Database\docker compose up -d`
- backend
  - This folder consist of backend solution running on expressJs with Prisma.
  - `npm install`
  - Follow following steps to spin up prisma
  - `npm install -D prisma`
  - `npx prisma init`
  - This will generate .evn file, copy following in .env
  - `DATABASE_URL="postgresql://postgres:cEPzAiiwN4XZQBwusuxT@127.0.0.1:5432/ghcdb?schema=public"`
  - Now run `npx prisma mirgate dev` . This will create datebase tables.
  - Now run `npx prisma generate`.
  - `npm run dev` to start.
  - check `http://localhost:8000`
  - Please find API Endpoint documentation in "Insomnia" folder. Import json file in insomnia to test all endpoints.
  - Appologies, I was not able to provide swagger docs in time.
- frontend
  - This folder contains front end.
  - `npm install`
  - `npm run start`
  - Check `http://locahost:3000`
- Screenshot folder contains all the screen I was able to design so far.
- Appologies, I was not able to develop more functionalities.
