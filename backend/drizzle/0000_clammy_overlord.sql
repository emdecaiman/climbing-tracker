CREATE TABLE "climbs" (
	"climb_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "climbs_climb_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255),
	"date" date DEFAULT now(),
	"location" varchar(255),
	"grade" varchar(10),
	"type" varchar(30),
	"environment" varchar(30),
	"flash" boolean,
	"note" varchar(255),
	"attachment" varchar(255)
);
