import { User } from "../models/user/user.model.js";
import { ShortURL } from "../models/shorturl.model.js";
export const getProfileOfUser = async(req, res) => {
    try{
        const user = req.user;
        const dbUser = await User.findOne({ _id: user.id });
        console.log("User profile data fetched from db: ", dbUser);
        return res.status(200).json({ message: "User profile data fetched successfully.", data: dbUser});
    } catch (error) {
        console.error("Error getting user profile data:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUrlsOfUser = async(req, res) => {
    try {
        const user = req.user;
        const dbUser = await User.findOne({ _id: user.id });
        const urls = await ShortURL.find({ userId: user.id });
        console.log("User URLs fetched from db: ", urls);
        return res.status(200).json({ message: "User URLs fetched successfully.", data: urls });

    } catch (error) {
        console.error("Error getting user URLs:", error.message);
        return res.status(500).send("Internal Server Error");
    }
}