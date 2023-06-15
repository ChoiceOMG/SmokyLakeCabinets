-- CreateTable
CREATE TABLE "WallHeight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GlassStyle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PantryTall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BoxMaterial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HardwarePackage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Drawers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "KitchenQuestions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_GlassStyleToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GlassStyleToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "GlassStyle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GlassStyleToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BoxMaterialToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BoxMaterialToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "BoxMaterial" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BoxMaterialToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_HardwarePackageToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_HardwarePackageToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "HardwarePackage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HardwarePackageToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DrawersToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DrawersToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "Drawers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DrawersToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_KitchenQuestionsToWallHeight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_KitchenQuestionsToWallHeight_A_fkey" FOREIGN KEY ("A") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KitchenQuestionsToWallHeight_B_fkey" FOREIGN KEY ("B") REFERENCES "WallHeight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_KitchenQuestionsToPantryTall" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_KitchenQuestionsToPantryTall_A_fkey" FOREIGN KEY ("A") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KitchenQuestionsToPantryTall_B_fkey" FOREIGN KEY ("B") REFERENCES "PantryTall" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_GlassStyleToKitchenQuestions_AB_unique" ON "_GlassStyleToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_GlassStyleToKitchenQuestions_B_index" ON "_GlassStyleToKitchenQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BoxMaterialToKitchenQuestions_AB_unique" ON "_BoxMaterialToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_BoxMaterialToKitchenQuestions_B_index" ON "_BoxMaterialToKitchenQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HardwarePackageToKitchenQuestions_AB_unique" ON "_HardwarePackageToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_HardwarePackageToKitchenQuestions_B_index" ON "_HardwarePackageToKitchenQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DrawersToKitchenQuestions_AB_unique" ON "_DrawersToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_DrawersToKitchenQuestions_B_index" ON "_DrawersToKitchenQuestions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_KitchenQuestionsToWallHeight_AB_unique" ON "_KitchenQuestionsToWallHeight"("A", "B");

-- CreateIndex
CREATE INDEX "_KitchenQuestionsToWallHeight_B_index" ON "_KitchenQuestionsToWallHeight"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_KitchenQuestionsToPantryTall_AB_unique" ON "_KitchenQuestionsToPantryTall"("A", "B");

-- CreateIndex
CREATE INDEX "_KitchenQuestionsToPantryTall_B_index" ON "_KitchenQuestionsToPantryTall"("B");
