import { Router } from "express";
import { userAuth } from "../middleware/middleware.js";

const userRouter = Router();

userRouter.get("/", (req, res) => {
   res.status(200).json({ message: "User route" });
});

userRouter.get("/profile", userAuth, (req, res) => {
   res.status(200).json({ message: "User profile", user: req.user });
});


export default userRouter;