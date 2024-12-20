CREATE TYPE "public"."businessType" AS ENUM('INDIVIDUAL', 'COMPANY');--> statement-breakpoint
CREATE TYPE "public"."cashRegisterStatus" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."expenseCategory" AS ENUM('FOOD', 'ENTERTAINMENT', 'TRAVEL', 'MEDICAL', 'INVENTARIO', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."MovementType" AS ENUM('IN', 'OUT');--> statement-breakpoint
CREATE TYPE "public"."PaymentMethodStatus" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."salesStatus" AS ENUM('OPEN', 'CLOSED');--> statement-breakpoint
CREATE TABLE "brands" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "businessInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"legalName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"address" varchar NOT NULL,
	"websiteUrl" varchar NOT NULL,
	"logoUrl" varchar NOT NULL,
	"businessType" "businessType" NOT NULL,
	"taxId" varchar NOT NULL,
	"timeZone" varchar NOT NULL,
	"currencyId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "cashMovements" (
	"id" serial PRIMARY KEY NOT NULL,
	"cashRegisterId" integer NOT NULL,
	"userId" integer NOT NULL,
	"amount" varchar NOT NULL,
	"reason" varchar NOT NULL,
	"type" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "cashRegisters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"location" varchar NOT NULL,
	"status" "cashRegisterStatus" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "cashSessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"cashRegisterId" integer NOT NULL,
	"userId" integer NOT NULL,
	"openingBalance" numeric(10, 2) NOT NULL,
	"closingBalance" numeric(10, 2) NOT NULL,
	"startTime" date NOT NULL,
	"endTime" date NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"symbol" varchar NOT NULL,
	"code" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" varchar NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"paymentMethodId" integer NOT NULL,
	"date" date NOT NULL,
	"note" varchar,
	"category" "expenseCategory" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "inventories" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"quantityIn" integer NOT NULL,
	"quantityOut" integer NOT NULL,
	"movementType" "MovementType" NOT NULL,
	"description" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "paymentMethods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"status" "PaymentMethodStatus" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "productStatus" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" varchar NOT NULL,
	"upc" varchar(13) NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"salePrice" numeric(10, 2) NOT NULL,
	"purchasePrice" numeric(10, 2) NOT NULL,
	"unitOfMeasurementId" integer NOT NULL,
	"stock" integer NOT NULL,
	"brandId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"supplierId" integer NOT NULL,
	"productStatusId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "products_sku_unique" UNIQUE("sku"),
	CONSTRAINT "products_upc_unique" UNIQUE("upc")
);
--> statement-breakpoint
CREATE TABLE "productsByBatches" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"batchId" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "saleDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"saleId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"unitPrice" numeric(10, 2) NOT NULL,
	"subTotal" numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" serial PRIMARY KEY NOT NULL,
	"cashRegisterId" integer NOT NULL,
	"userId" integer NOT NULL,
	"customerId" integer NOT NULL,
	"paymentMethodId" integer NOT NULL,
	"status" "salesStatus" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "unitsOfMeasurment" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"userName" varchar NOT NULL,
	"password" varchar NOT NULL,
	"roleId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "users_userName_unique" UNIQUE("userName")
);
--> statement-breakpoint
ALTER TABLE "businessInfo" ADD CONSTRAINT "businessInfo_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashMovements" ADD CONSTRAINT "cashMovements_cashRegisterId_cashRegisters_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."cashRegisters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashMovements" ADD CONSTRAINT "cashMovements_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashSessions" ADD CONSTRAINT "cashSessions_cashRegisterId_cashRegisters_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."cashRegisters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cashSessions" ADD CONSTRAINT "cashSessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_paymentMethodId_paymentMethods_id_fk" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."paymentMethods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_unitOfMeasurementId_unitsOfMeasurment_id_fk" FOREIGN KEY ("unitOfMeasurementId") REFERENCES "public"."unitsOfMeasurment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brandId_brands_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "public"."suppliers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_productStatusId_productStatus_id_fk" FOREIGN KEY ("productStatusId") REFERENCES "public"."productStatus"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productsByBatches" ADD CONSTRAINT "productsByBatches_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saleDetails" ADD CONSTRAINT "saleDetails_saleId_sales_id_fk" FOREIGN KEY ("saleId") REFERENCES "public"."sales"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saleDetails" ADD CONSTRAINT "saleDetails_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_cashRegisterId_cashRegisters_id_fk" FOREIGN KEY ("cashRegisterId") REFERENCES "public"."cashRegisters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_paymentMethodId_paymentMethods_id_fk" FOREIGN KEY ("paymentMethodId") REFERENCES "public"."paymentMethods"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;