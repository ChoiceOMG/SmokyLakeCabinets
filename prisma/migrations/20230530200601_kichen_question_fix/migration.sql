/*
  Warnings:

  - You are about to drop the `Drawers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DrawersToKitchenQuestions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Drawers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DrawersToKitchenQuestions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Drawer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DrawerToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DrawerToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Drawer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DrawerToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_DrawerToKitchenQuestions_AB_unique" ON "_DrawerToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_DrawerToKitchenQuestions_B_index" ON "_DrawerToKitchenQuestions"("B");
