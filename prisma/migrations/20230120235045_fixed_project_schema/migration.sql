-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "lastModified" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER,
    "type" TEXT,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("lastModified", "name", "projectId", "size", "type", "url") SELECT "lastModified", "name", "projectId", "size", "type", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE UNIQUE INDEX "Image_url_key" ON "Image"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
