-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"Roles" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "loads" (
	"id" serial NOT NULL UNIQUE,
	"description" varchar(500) NOT NULL,
	"time" timestamp without time zone NOT NULL,
	"pickup_location" varchar(255) NOT NULL,
	"dropoff_location" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "load_assignments" (
	"id" serial NOT NULL UNIQUE,
	"load_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"log_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "driving_logs" (
	"id" serial NOT NULL UNIQUE,
	"Location" varchar(255) NOT NULL,
	"start_time" timestamp without time zone NOT NULL,
	"end_time" timestamp without time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Inspection" (
	"Vehicle_id" serial NOT NULL UNIQUE,
	"driver_id" bigint NOT NULL,
	"Brakes" boolean NOT NULL,
	"Tires" boolean NOT NULL,
	"Lights" boolean NOT NULL,
	"Fluids:" boolean NOT NULL,
	"Electrical_systems" boolean NOT NULL,
	"wipers" boolean NOT NULL,
	PRIMARY KEY ("Vehicle_id")
);



ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk1" FOREIGN KEY ("load_id") REFERENCES "loads"("id");

ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk3" FOREIGN KEY ("log_id") REFERENCES "driving_logs"("id");

ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_fk1" FOREIGN KEY ("driver_id") REFERENCES "driving_logs"("id");


