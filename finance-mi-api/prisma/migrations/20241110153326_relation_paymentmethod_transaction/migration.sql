/*
  Warnings:

  - Added the required column `paymentMethodName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "paymentMethodName" TEXT NOT NULL,
ADD COLUMN     "paymentMethodUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodName_paymentMethodUserId_fkey" FOREIGN KEY ("paymentMethodName", "paymentMethodUserId") REFERENCES "PaymentMethod"("name", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
