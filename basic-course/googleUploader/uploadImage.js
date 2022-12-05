import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import fs from "fs";

const KEY_FILE_PATH = "./ServiceAccountCredentials.json";
const SCOPES = ["https://www.googleapis.com/auth/drive"];

export default async function (path, fileName) {
  const auth = new GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
  });

  const driveService = google.drive({ version: "v3", auth });
  let fileMetaData = {
    name: fileName,
    parents: ["1N-QLCiGcn02QdNnxrS9QHppUGu2LuscQ"],
  };

  const media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream(path),
  };

  const file = await driveService.files.create({
    resource: fileMetaData,
    media: media,
    fields: "id",
  });
  return file.data.id;
}
