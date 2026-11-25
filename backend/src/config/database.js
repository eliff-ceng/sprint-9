import mongoose from "mongoose";

// Baglanti dizesi yalnizca .env'den okunur; asla koda yazilmaz.
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri || !uri.trim()) {
    throw new Error("MONGODB_URI tanimli degil. backend/.env dosyasini kontrol et.");
  }

  await mongoose.connect(uri);

  // Konsolda sifre veya tam URI gorunmemeli.
  const { host, name } = mongoose.connection;
  console.log(`MongoDB baglandi: ${host}/${name}`);
}
