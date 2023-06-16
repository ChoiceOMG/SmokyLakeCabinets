-- CreateTable
CREATE TABLE "CabinetStyle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "img" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CabinetStyleToKitchenQuestions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CabinetStyleToKitchenQuestions_A_fkey" FOREIGN KEY ("A") REFERENCES "CabinetStyle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CabinetStyleToKitchenQuestions_B_fkey" FOREIGN KEY ("B") REFERENCES "KitchenQuestions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CabinetStyleToKitchenQuestions_AB_unique" ON "_CabinetStyleToKitchenQuestions"("A", "B");

-- CreateIndex
CREATE INDEX "_CabinetStyleToKitchenQuestions_B_index" ON "_CabinetStyleToKitchenQuestions"("B");
