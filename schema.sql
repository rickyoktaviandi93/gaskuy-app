CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS postgis;
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('CUSTOMER','DRIVER','ADMIN'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE order_status AS ENUM ('SEARCHING','ACCEPTED','ARRIVED','ON_TRIP','COMPLETED','CANCELLED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS users(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, phone TEXT UNIQUE NOT NULL,
 password_hash TEXT NOT NULL, role user_role NOT NULL DEFAULT 'CUSTOMER', created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS drivers(
 id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE, vehicle_plate TEXT, vehicle_model TEXT,
 is_online BOOLEAN DEFAULT false, is_verified BOOLEAN DEFAULT false,
 last_location GEOGRAPHY(POINT,4326), updated_at TIMESTAMPTZ DEFAULT now());
CREATE INDEX IF NOT EXISTS drivers_location_idx ON drivers USING GIST(last_location);

CREATE TABLE IF NOT EXISTS tariffs(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name TEXT NOT NULL, base_fare NUMERIC DEFAULT 5000,
 price_per_km NUMERIC DEFAULT 2500, minimum_fare NUMERIC DEFAULT 10000, service_fee NUMERIC DEFAULT 1000, active BOOLEAN DEFAULT true);

CREATE TABLE IF NOT EXISTS orders(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), customer_id UUID NOT NULL REFERENCES users(id),
 driver_id UUID REFERENCES drivers(id), status order_status DEFAULT 'SEARCHING',
 pickup_address TEXT NOT NULL, destination_address TEXT NOT NULL,
 pickup_location GEOGRAPHY(POINT,4326) NOT NULL, destination_location GEOGRAPHY(POINT,4326) NOT NULL,
 distance_km NUMERIC DEFAULT 0, estimated_fare NUMERIC DEFAULT 0,
 created_at TIMESTAMPTZ DEFAULT now(), accepted_at TIMESTAMPTZ, completed_at TIMESTAMPTZ);

CREATE TABLE IF NOT EXISTS order_status_history(
 id BIGSERIAL PRIMARY KEY, order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
 status order_status NOT NULL, created_at TIMESTAMPTZ DEFAULT now());

CREATE TABLE IF NOT EXISTS ratings(
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), order_id UUID UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
 customer_id UUID REFERENCES users(id), driver_id UUID REFERENCES drivers(id), stars INT CHECK(stars BETWEEN 1 AND 5), comment TEXT, created_at TIMESTAMPTZ DEFAULT now());

INSERT INTO tariffs(name,base_fare,price_per_km,minimum_fare,service_fee,active)
SELECT 'GasKuy Motor',5000,2500,10000,1000,true
WHERE NOT EXISTS(SELECT 1 FROM tariffs WHERE active=true);
