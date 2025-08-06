import jwt from "jsonwebtoken";
import { IUser } from "../model/user.model";

const generateJwt = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      name: user.displayName,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export default generateJwt;