PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('7a6367be-0504-422b-ba1b-82f929d370a0','bdc7ee996694ff1a8244ecfd2988dea5efc019691d5790f9d5d5b79ac7ff83',1616747968671,'20210326083858_init',NULL,NULL,1616747968668,1);
INSERT INTO _prisma_migrations VALUES('e81b93cd-91fd-44ca-97bc-9736dcfb8191','3061b15e46c4d02690f8bf3b8bb3fd4f163b34f99fef85f5c88f42e39cce5dd3',1616749703845,'20210326090823_custom_id',NULL,NULL,1616749703841,1);
INSERT INTO _prisma_migrations VALUES('36ce84f2-2ee8-4c10-a53a-f592f789ef1a','99d664d9f0d6609ddb914378a25de0c8ab5e72bad873924bec0aad19e7681d1',1616749720289,'20210326090840_custom_id',NULL,NULL,1616749720285,1);
INSERT INTO _prisma_migrations VALUES('2c210146-106f-4167-a0a5-d89dc673b566','e1556fd8c7483ae9e7e61c43e18a4c7586647abf6d95e335849a84ff2a716',1616770088084,'20210326144808_optional_password',NULL,NULL,1616770088079,1);
INSERT INTO _prisma_migrations VALUES('98179177-3df3-49d0-8225-4238e4bf5353','4882538512a6ee102f2d529da7ae534fe895423ea39ca81f854349e365cc5ed',1618817911897,'20210418202717_create_whitelisted_tokens_table',NULL,NULL,1618817911895,1);
INSERT INTO _prisma_migrations VALUES('0d24b636-33bb-4723-8895-9cf862541768','2b2c93aeab7c8264a936f68c32fbe04eb5ba30a3d1a88651e79d7c2d1261929',1621154478542,'20210516084118_estates',NULL,NULL,1621154478538,1);
INSERT INTO _prisma_migrations VALUES('5dadbf2d-74bf-477b-9040-1de7385f4c42','bc37c36ca3567ea9db72755923fc54c9b66e6cd844885f464ec8f226f72980',1621850533429,'20210524100213_images',NULL,NULL,1621850533424,1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT
);
INSERT INTO User VALUES('4dc96927-3324-4455-8505-80170a571dc5','test@test.pl','sha256$fIp1EpkV/u1/5a0W9T1bZJHDi6xDeecALTrnLbvhzpU=$dozZ4vBELuI2izrSS9fYPxHhUObVgKMrxKDKmRxalGQ=');
INSERT INTO User VALUES('a3a9cfb5-1a6d-454c-a0ce-cfa0895721fb','asd@test.pl','sha256$C8NoqJ+MU66qh8PmEJPKMWjDmHvlLXtVb6X7eejCiek=$QvahS+oiVgvRR7Q1hPcIn/GPQAhBEd1ZivkgkCDBPdU=');
INSERT INTO User VALUES('1b2bfd55-6b3c-415f-b7eb-edec13513b4f','hysterus@gmail.com','sha256$w4U9bsL2654GMMkFcP23hstWpC7uKezXr/EV9Hs8kMg=$UHBhlQx7UZZZLOzLOnbni99u9Pt49fXQEfOdZFxXBdU=');
INSERT INTO User VALUES('6f94b3ae-e17b-4ab4-be34-7ee0692f0e70','asd@asd.pl','sha256$7kYZG/xwmecrmL6C3WrnOCRcOcKS79iaBTMrvzWbyWE=$my5fqQCPQX9cwxu/BierHn/59jM1k+UHCLJOrm7xU64=');
INSERT INTO User VALUES('aa332005-ae8a-4a5a-a798-35ec481d0a76','asd2@test.pl','sha256$R4w/9UukcU34M8OTSEzAj8f9wWfGeXoG0nkwhXbKI78=$U7xqDToN4JCXKhMdg5FQ4UEupjmLYjO5504lWBpWdjM=');
CREATE TABLE IF NOT EXISTS "WhitelistedTokens" (
    "token" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO WhitelistedTokens VALUES('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhMzMyMDA1LWFlOGEtNGE1YS1hNzk4LTM1ZWM0ODFkMGE3NiIsImVtYWlsIjoiYXNkMkB0ZXN0LnBsIiwiaWF0IjoxNjIyNDY1OTMxfQ.H_gn3MEAAbqi3kDafaIcsdH2yq1go0no6XwO6AdxUto');
INSERT INTO WhitelistedTokens VALUES('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFhMzMyMDA1LWFlOGEtNGE1YS1hNzk4LTM1ZWM0ODFkMGE3NiIsImVtYWlsIjoiYXNkMkB0ZXN0LnBsIiwiaWF0IjoxNjIyNDY2MDMyfQ.8QvybgzpRbGX3sbhqiw-anCnutLe7MqfiKA2Dj8Hvvg');
CREATE TABLE IF NOT EXISTS "Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL
);
INSERT INTO Tenant VALUES('d21b0ff9-cf8e-4fd5-ab1a-7549226c738d','Test Testowski');
CREATE TABLE IF NOT EXISTS "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "estateId" TEXT NOT NULL,
    FOREIGN KEY ("estateId") REFERENCES "Estate" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Address VALUES('9ade3164-1af3-4d95-950a-9fa47a3e9212','PL','82-300','Asd','db920a65-9854-4fe0-99b1-d8585f34e621');
INSERT INTO Address VALUES('085811ba-67f0-43f6-ab84-6b400047483c','PL','82-300','Asd','cbdcae85-465e-41ec-95b0-24ec62337f13');
CREATE TABLE IF NOT EXISTS "Position" (
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
INSERT INTO Position VALUES('b6b023ec-bfe6-478f-aedc-3ed8b6f7c644','Spoldzielnia','PLN',500,12,'db920a65-9854-4fe0-99b1-d8585f34e621',NULL);
INSERT INTO Position VALUES('70dc1ea3-8914-44b4-bc6a-fa876c1031a8','Spoldzielnia','PLN',500,12,'cbdcae85-465e-41ec-95b0-24ec62337f13',NULL);
CREATE TABLE IF NOT EXISTS "_EstateToTenant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Estate" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO _EstateToTenant VALUES('db920a65-9854-4fe0-99b1-d8585f34e621','d21b0ff9-cf8e-4fd5-ab1a-7549226c738d');
CREATE TABLE IF NOT EXISTS "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "Resolution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "imageId" INTEGER NOT NULL,
    FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Estate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "imageId" INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO Estate VALUES('db920a65-9854-4fe0-99b1-d8585f34e621','Some estate','4dc96927-3324-4455-8505-80170a571dc5',NULL);
INSERT INTO Estate VALUES('cbdcae85-465e-41ec-95b0-24ec62337f13','Some cool estate','aa332005-ae8a-4a5a-a798-35ec481d0a76',NULL);
DELETE FROM sqlite_sequence;
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
CREATE UNIQUE INDEX "Address_estateId_unique" ON "Address"("estateId");
CREATE UNIQUE INDEX "_EstateToTenant_AB_unique" ON "_EstateToTenant"("A", "B");
CREATE INDEX "_EstateToTenant_B_index" ON "_EstateToTenant"("B");
CREATE UNIQUE INDEX "Estate_imageId_unique" ON "Estate"("imageId");
COMMIT;