CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL UNIQUE,
    "proctorId" TEXT NOT NULL,
    
    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "aadharNumber" TEXT NOT NULL UNIQUE,
    
    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "LibraryMembership" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL UNIQUE,
    "issueDate" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,

    CONSTRAINT "LibraryMembership_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LibraryMembership_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE CASCADE
);

ALTER TABLE "Student" ADD CONSTRAINT "Student_proctorId_fkey" FOREIGN KEY ("proctorId") REFERENCES "Professor" ("id") ON DELETE CASCADE;

