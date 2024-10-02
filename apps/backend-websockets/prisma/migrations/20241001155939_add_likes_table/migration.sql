-- CreateTable
CREATE TABLE "Likes" (
    "userId" TEXT NOT NULL,
    "likeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId")
);
