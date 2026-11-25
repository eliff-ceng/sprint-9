import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 3000;

try {
  // MongoDB baglantisi kurulmadan HTTP sunucusunu acma.
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Kampus API calisiyor: http://localhost:${port}`);
  });
} catch (error) {
  console.error("Sunucu baslatilamadi:", error.message);
  process.exitCode = 1;
}
