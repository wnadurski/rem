-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Resolution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Estate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "imageId" INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Estate" ("id", "name", "ownerId") SELECT "id", "name", "ownerId" FROM "Estate";
DROP TABLE "Estate";
ALTER TABLE "new_Estate" RENAME TO "Estate";
CREATE UNIQUE INDEX "Estate_imageId_unique" ON "Estate"("imageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
