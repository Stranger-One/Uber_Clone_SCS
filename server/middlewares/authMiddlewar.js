import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistTokenModel.js";

export default {
    authUser: async (req, res, next) => {
        try {
            const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                return res.status(401).send({
                    success: false,
                    error: "Unauthorized access :: No token provided"
                });
            }

            const isBlacklistedToken = await BlacklistToken.findOne({ token });
            if (isBlacklistedToken) {
                return res.status(401).send({
                    success: false,
                    error: "Unauthorized access :: Token blacklisted"
                });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded.id });
            if (!user) {
                return res.status(401).send({
                    success: false,
                    error: "Unauthorized access :: User not found"
                });
            }

            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({
                success: false,
                error: error.message
            });
        }
    }
}


