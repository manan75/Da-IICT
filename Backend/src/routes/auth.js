import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();
const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const user = await prisma.user.create({
         data: {
            name,
            email,
            password
         }
      });
      res.status(201).json(user);
   } catch (error) {
      res.status(500).json({ error: "Error creating user" });
   }
});


authRouter.get('/signin', async (req, res) => {
   res.send("Signin route");
});

export default authRouter;