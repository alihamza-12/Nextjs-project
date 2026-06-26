 datasource: {
    url: "file:./app.db",
  },
  npm install @prisma/client
  npm install better-sqlite3
  npx prisma generate
  npx prisma studio
npm install @libsql/client @prisma/adapter-libsql
npx prisma db push

npx tsx prisma/seed.ts (For add the products in DB first time)