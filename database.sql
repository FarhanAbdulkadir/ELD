-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "user" (
  "id" serial NOT NULL UNIQUE,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "Roles" bigint NOT NULL DEFAULT 0,
  PRIMARY KEY ("id")
);


--CREATE TABLE IF NOT EXISTS "loads" (
--	"id" SERIAL UNIQUE NOT NULL,
--	"description" varchar(500) NOT NULL,
--	"time" timestamp NOT NULL,
--	"pickup_location" varchar(255) NOT NULL,
--	"dropoff_location" varchar(255) NOT NULL,
--	PRIMARY KEY ("id")
--	
--	
--);

CREATE TABLE IF NOT EXISTS "load_assignments" (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(300) NOT NULL,
	"user_id" bigint NOT NULL,
	"log_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

--CREATE TABLE IF NOT EXISTS "driving_logs" (
--	"id" serial NOT NULL UNIQUE,
--	"location" varchar(255) NOT NULL,
--	"start_time" timestamp with time zone NOT NULL,
--	"end_time" timestamp with time zone NULL,
--	PRIMARY KEY ("id")
--);

CREATE TABLE IF NOT EXISTS "Inspection" (
	"vehicle_id" serial NOT NULL UNIQUE,
	"driver_id" bigint NOT NULL,
	"brakes" boolean NOT NULL,
	"tires" boolean NOT NULL,
	"lights" boolean NOT NULL,
	"fluids" boolean NOT NULL,
	"electrical_systems" boolean NOT NULL,
	"wipers" boolean NOT NULL,
	PRIMARY KEY ("vehicle_id")
);



ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk1" FOREIGN KEY ("id") REFERENCES "loads"("id");

ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk2" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "load_assignments" ADD CONSTRAINT "load_assignments_fk3" FOREIGN KEY ("log_id") REFERENCES "driving_logs"("id");

ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_fk1" FOREIGN KEY ("driver_id") REFERENCES "driving_logs"("id");







CREATE TABLE IF NOT EXISTS "loads" (
	"id" SERIAL PRIMARY KEY,
	"description"  varchar(300),
	"time" timestamp,
	"pickup_location" varchar(200),
	"dropoff_location" varchar(200),
	"user_id" integer REFERENCES "user"
	
);

INSERT INTO "loads" ("description", "time", "pickup_location", "dropoff_location", "user_id")
values('Reefer', '2024-10-30 10:30:01', 'MSP9 Amazon', 'DLN4 Amazon', 1);

INSERT INTO "loads" ("description", "time", "pickup_location", "dropoff_location", "user_id")
VALUES ('Dry Van', '2024-11-02 14:00:00', 'Warehouse A', 'Store B', 2);


CREATE TABLE IF NOT EXISTS "driverInfo" (
	"id" SERIAL PRIMARY KEY, 
	"location" VARCHAR (300),
	"start_time" TIMESTAMP, 
	"end_time" TIMESTAMP,
	"user_id" integer REFERENCES "user"

);

INSERT INTO "driverInfo" (location, start_time, end_time, user_id) 
VALUES ('123 Main St, Springfield', '2024-11-01 08:00:00', '2024-11-01 10:00:00', 1);










