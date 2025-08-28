import bcrypt from 'bcrypt';
import { Router } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from "../../generated/prisma/client.js";
import { LoginSchema, SignUpSchema } from "../schemas/authSchemas.js";
import { JWT_PASSWORD } from '../secrets/config.js';

const prisma = new PrismaClient();
const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
   const result = SignUpSchema.safeParse(req.body);
   if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
   }

   const { email, password, name } = result.data;
   const hashedPassword = await bcrypt.hash(password, 10);

   try {
      const newUser = await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword
         }
      });
      // console.log(newUser)
      res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
      if(error.code === 'P2002') {
         res.status(409).json({ message: 'Email already exists', error });
      } else {
         res.status(500).json({ message: 'Failed to create user', error });
      }
   }
});


authRouter.post("/signin", async (req, res) => {
   const result = LoginSchema.safeParse(req.body);
   if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
   }

   const { email, password } = result.data;

   try {
      const existingUser = await prisma.user.findUnique({
         where: { email }
      });
      if (!existingUser) {
         res.status(400).json({ message: "No User Found with such Email Id." });
         return;
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      console.log(existingUser)
      if (isMatch) {
         const token = jwt.sign({ id: existingUser.id }, JWT_PASSWORD, {expiresIn: '24h'});
         res.status(200).json({
            message: "Signed In successfully.",
            token
         })
      } else {
         res.status(400).json({ message: "Incorrect Credentials." });
         return;
      }
   } catch (error) {
      res.status(500).json({
         message: "Internal server error",
         error
      })
   }
})

export default authRouter;