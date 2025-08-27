import { PORT } from "./secrets/config.js";
import { PrismaClient } from "../generated/prisma/client.js";
import app from "./app.js";

const prisma = new PrismaClient();


//? Main Function to Start the server and test the connectivity to Database.
async function main() {
   try {
      await prisma.$connect();
      console.log("✅ Database connection successful!");

      app.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`);
      });

   } catch (error) {
      console.error("❌ Database connection failed:");
      console.error("Error message:", error.message);

      if (error.code === 'P1001') {
         console.error("🔍 This usually means the database server is unreachable.");
         console.error("   Check if PostgreSQL is running and the connection string is correct.");
      } else if (error.code === 'P1003') {
         console.error("🔍 Database does not exist.");
         console.error("   Make sure the database specified in your connection string exists.");
      } else if (error.code === 'P1000') {
         console.error("🔍 Authentication failed.");
         console.error("   Check your database username and password.");
      }
   }
}

main();
