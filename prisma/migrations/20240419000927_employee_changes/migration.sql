-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
