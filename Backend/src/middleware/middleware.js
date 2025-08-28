import jwt from 'jsonwebtoken';
import { JWT_PASSWORD } from '../secrets/config.js';

function userAuth(req, res, next) {
   try {
      const token = req.headers.token;
      if (!token) {
         return res.status(401).json({ error: "Unauthorized: No token provided" });
      }

      jwt.verify(token, JWT_PASSWORD, (err, decoded) => {
         if (err) {
            return res.status(403).json({ error: "Forbidden: Invalid token" });
         }

         req.user = decoded; // id
         next();
      });
   } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error: Failed to authenticate token" });
   }
}

export { userAuth };
