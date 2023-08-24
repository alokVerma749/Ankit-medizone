import 'dotenv/config';
import app from "./App.js";

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Medizone is listening on port ${port}`)
});