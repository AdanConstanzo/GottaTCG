import jwt from "jsonwebtoken";
import User from "../models/User";

export const AuthNull = (req, res, next) => {
    const header = req.headers.authorization;
    let token;

    if (header) token = header.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                req.currentUser = null;
                next();
            } else {
                User.findOne({ email: decoded.email }).then(user => {
                    req.currentUser = user;
                    next();
                });
            }
        });
    } else {
        req.currentUser = null;
        next();
    }
};
