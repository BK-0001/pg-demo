import { app } from "./app";
import { HOST, PORT } from "./env";

app.listen(PORT, () => {
  console.log(`[server]: Listening at http://${HOST}:${PORT}`);
});
