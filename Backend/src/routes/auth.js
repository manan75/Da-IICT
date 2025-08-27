import { Router } from "express";

const authRouter = Router();

authRouter.get('/signup', async (req, res) => {
   res.json("Signup route");
});

authRouter.get('/signin', async (req, res) => {
   res.send("Signin route");
});

export default authRouter;