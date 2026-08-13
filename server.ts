import dotenv from "dotenv";
import app from "./api/app";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 4300;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});