export const printHelloWorld = (req, res) => {
    try{
        const message = "Hello, World!";
        console.log(message);
        res.status(200).json({ message: "Successfully printed the message.",
                                data: message });
    } catch (error) {
        console.error("Error printing Hello, World!", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const doNothingController = (req, res) => {
    try{
        console.log("Doing nothing...");
        return res.status(200).json({ message: "Did nothing successfully." });
    } catch (error) {
        console.error("Error doing nothing!", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getDataFromFrontend = (req, res) => {
    try{
        const params = req.params;
        console.log("Params received:", params);
        const productId = params.productId;
        const userId = params.userId;
        const courseId = params.courseId;
        console.log("Product ID:", productId);
        res.status(200).json({ message: "Data received successfully.", data: { productId, userId, courseId } });
    } catch (error) {
        console.error("Error receiving data from frontend!", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}