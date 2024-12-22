-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('customer', 'admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'customer';
