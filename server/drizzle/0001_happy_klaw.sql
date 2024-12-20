CREATE TYPE "public"."cashMovementType" AS ENUM('CASH_IN', 'CASH_OUT', 'INITIAL_BALANCE', 'CLOSING_BALANCE', 'ADJUSTMENT', 'WITHDRAWAL', 'DEPOSIT');--> statement-breakpoint
CREATE TYPE "public"."cashSessionStatus" AS ENUM('OPEN', 'CLOSED', 'FORCE_CLOSED');--> statement-breakpoint
ALTER TYPE "public"."cashRegisterStatus" ADD VALUE 'MAINTENANCE';--> statement-breakpoint
ALTER TYPE "public"."cashRegisterStatus" ADD VALUE 'OUT_OF_SERVICE';--> statement-breakpoint
ALTER TABLE "cashMovements" ALTER COLUMN "type" SET DATA TYPE cashMovementType;--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "cashSessions" ADD COLUMN "status" "cashSessionStatus" NOT NULL;--> statement-breakpoint
ALTER TABLE "inventories" ADD COLUMN "quantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD COLUMN "symbol" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD COLUMN "type" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD COLUMN "baseUnit" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD COLUMN "conversionFactor" numeric(10, 4);--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD COLUMN "displayOrder" integer;--> statement-breakpoint
ALTER TABLE "inventories" DROP COLUMN "quantityIn";--> statement-breakpoint
ALTER TABLE "inventories" DROP COLUMN "quantityOut";--> statement-breakpoint
ALTER TABLE "unitsOfMeasurment" ADD CONSTRAINT "unitsOfMeasurment_name_unique" UNIQUE("name");