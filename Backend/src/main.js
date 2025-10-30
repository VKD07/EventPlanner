import app from "./app.js";
import con from "./dbConnection/dbConnection.js";

const PORT = 3000;
const URL = "http://localhost:";

app.listen(PORT, () => {
  console.log(`Server running on ${URL}${PORT}`);
});