/*
  Warnings:

  - The primary key for the `PaymentMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentMethodUserId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodName_paymentMethodUserId_fkey";

-- AlterTable
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_pkey",
ADD CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentMethodUserId";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentMethodName_fkey" FOREIGN KEY ("paymentMethodName") REFERENCES "PaymentMethod"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
