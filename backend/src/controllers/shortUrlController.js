import { ShortURL } from "../models/shorturl.model.js";
import {nanoid} from "nanoid";


export const createShortURL = async (req, res) => {
    try {
        let {originalUrl, title, expiryDate, customUrl} = req.body;
        const userId = req.user.id;
        let newNanoId = nanoid(7);

        while(true) {
            const existing = await ShortURL.findOne({ shortCode: newNanoId });
            if(!existing) break;
            newNanoId = nanoid(7);
        }

        if(customUrl) {
            const existing = await ShortURL.findOne({ shortCode: customUrl});
            if(!existing) {
                newNanoId = customUrl;
            }
        }

        const newSortCode = await ShortURL.create({
            originalUrl,
            title,
            shortCode: newNanoId,
            expiresAt: new Date(expiryDate),
            userId,
        });

        res.status(200).json({
            message: "Short URL created successfully",
            data: newSortCode
        });

    } catch (error) {
        console.error("Error creating short URL:", error.message);
        return res.status(500).json({
            message: "error from create short URL",
            error: "Internal Server Error"
        });
    }
   
}

 export const redirectToOriginalURL = async (req, res) => {
        try{
            const { shortCode } = req.params;

            const doc = await ShortURL.findOne({ shortCode });

            if(!doc){
                return res.status(404).json(
                    {
                        message: "Short URL not found"
                    }
                );
            }
            const originalUrl = doc.originalUrl;
            return res.redirect(originalUrl);
        } catch (error) {
            console.error("Error redirecting to original URL:", error.message);
            return res.status(500).json({
                message: "Error from redirecting to original URL",
                error: "Internal Server Error"
            });
        }
    }
export const deleteShortUrl = async (req, res) => {
    try{
        const {shortUrl} = req.params;
        const existed = await ShortURL.findOne({shortCode: shortUrl});
        if(!existed) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        existed.isActive = false;
        await existed.save();
        
        return res.status(200).json({
            message: "Short URL deleted successfully"
        });
    }
    catch(error) {
        console.error("Error deleting short URL:", error.message);
        return res.status(500).json({
            message: "Error from deleting short URL",
            error: "Internal Server Error"
        });
    }
}