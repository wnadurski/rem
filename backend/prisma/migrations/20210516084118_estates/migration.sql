-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Estate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "estateId" TEXT NOT NULL,
    FOREIGN KEY ("estateId") REFERENCES "Estate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "priceValue" DECIMAL NOT NULL,
    "monthsPerYear" INTEGER NOT NULL,
    "expenseForId" TEXT,
    "incomeForId" TEXT,
    FOREIGN KEY ("expenseForId") REFERENCES "Estate" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("incomeForId") REFERENCES "Estate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EstateToTenant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Estate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_estateId_unique" ON "Address"("estateId");

-- CreateIndex
CREATE UNIQUE INDEX "_EstateToTenant_AB_unique" ON "_EstateToTenant"("A", "B");

-- CreateIndex
CREATE INDEX "_EstateToTenant_B_index" ON "_EstateToTenant"("B");
