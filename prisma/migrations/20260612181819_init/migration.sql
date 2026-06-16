/*
  Warnings:

  - Made the column `organizationInfo` on table `Inquiry` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Inquiry" ALTER COLUMN "organizationInfo" SET NOT NULL;
