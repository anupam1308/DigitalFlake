import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();


const demoUser = {
  id: "1",
  email: "admin1@digitalflake.com",
  
  passwordHash: bcrypt.hashSync("Hero123", 10),
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== demoUser.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, demoUser.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: demoUser.id, email: demoUser.email },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: { id: demoUser.id, email: demoUser.email },
  });
});

export default router;
