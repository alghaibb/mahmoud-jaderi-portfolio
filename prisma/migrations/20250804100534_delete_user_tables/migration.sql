-- CreateEnum
CREATE TYPE "public"."MessageStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "public"."contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "status" "public"."MessageStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contact_replies" (
    "id" TEXT NOT NULL,
    "contactMessageId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_replies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."contact_replies" ADD CONSTRAINT "contact_replies_contactMessageId_fkey" FOREIGN KEY ("contactMessageId") REFERENCES "public"."contact_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
