/*
  Warnings:

  - You are about to drop the column `paymentMethodName` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paymentMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethodEnum" AS ENUM ('cash', 'creditCard');

-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_paymentMethodName_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentMethodName",
ADD COLUMN     "paymentMethod" "PaymentMethodEnum" NOT NULL;

-- DropTable
DROP TABLE "PaymentMethod";
