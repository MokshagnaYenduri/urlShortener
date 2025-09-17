export const getProfileOfUser = (req, res) => {
    try{
        console.log("Printing cookies: ", req.cookies);
        console.log("User profile data requested.");
        return res.status(200).json({ message: "User profile data fetched successfully.", data: { name: "Mokshagna Yenduri", email: "mokshagna.yenduri@example.com" } });
    } catch (error) {
        console.error("Error getting user profile data:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}