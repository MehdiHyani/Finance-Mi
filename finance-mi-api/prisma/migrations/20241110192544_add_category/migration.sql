/*
  Warnings:

  - Added the required column `iconUrl` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryName` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodName_paymentMethodUserId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "iconUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "categoryName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "IconUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodName_paymentMethodUserId_fkey" FOREIGN KEY ("paymentMethodName", "paymentMethodUserId") REFERENCES "PaymentMethod"("name", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
