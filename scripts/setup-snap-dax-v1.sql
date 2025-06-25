-- SNAP DAX Database Setup - Version 1
-- Simple setup that works with existing database

-- QGI Bonds for Citizens (simplified)
CREATE TABLE IF NOT EXISTS qgi_citizen_bonds (
    id SERIAL PRIMARY KEY,
    citizen_id VARCHAR(50) UNIQUE NOT NULL,
    bond_amount DECIMAL(15,2) DEFAULT 250000.00,
    bank_rate DECIMAL(5,4) NOT NULL DEFAULT 0.0525,
    purchase_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active',
    leverage_ratio DECIMAL(5,2) DEFAULT 60.00,
    available_lending_capacity DECIMAL(15,2) DEFAULT 15000000.00,
    current_utilization DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Business Bonds (simplified)
CREATE TABLE IF NOT EXISTS business_bonds (
    id SERIAL PRIMARY KEY,
    business_id VARCHAR(50) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    bond_amount DECIMAL(15,2) DEFAULT 500000.00,
    bank_rate DECIMAL(5,4) NOT NULL DEFAULT 0.0525,
    purchase_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active',
    credit_guarantee_amount DECIMAL(15,2) DEFAULT 500000.00,
    current_credit_utilization DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Government Programs Registry
CREATE TABLE IF NOT EXISTS government_programs (
    id SERIAL PRIMARY KEY,
    program_code VARCHAR(50) UNIQUE NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    agency VARCHAR(100) NOT NULL,
    program_type VARCHAR(50) NOT NULL,
    max_loan_amount DECIMAL(15,2),
    guarantee_percentage DECIMAL(5,2),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Loan Program Matching
CREATE TABLE IF NOT EXISTS loan_program_matches (
    id SERIAL PRIMARY KEY,
    loan_application_id VARCHAR(100) NOT NULL,
    program_id INTEGER REFERENCES government_programs(id),
    match_score DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'pending',
    program_loan_number VARCHAR(100),
    guarantee_amount DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample government programs
INSERT INTO government_programs (program_code, program_name, agency, program_type, max_loan_amount, guarantee_percentage) 
VALUES 
('SBA_7A', 'SBA 7(a) Loan Program', 'SBA', 'guarantee', 5000000, 85.00),
('HUD_FHA', 'FHA Mortgage Insurance', 'HUD', 'guarantee', 970800, 96.50),
('VA_HOME', 'VA Home Loan Guarantee', 'VA', 'guarantee', 1000000, 100.00),
('USDA_RD', 'USDA Rural Development', 'USDA', 'guarantee', 500000, 90.00)
ON CONFLICT (program_code) DO NOTHING;

-- Insert sample QGI bonds
INSERT INTO qgi_citizen_bonds (citizen_id, bond_amount, bank_rate, available_lending_capacity)
VALUES 
('CITIZEN_001', 250000.00, 0.0525, 15000000.00),
('CITIZEN_002', 250000.00, 0.0525, 15000000.00),
('CITIZEN_003', 250000.00, 0.0525, 15000000.00)
ON CONFLICT (citizen_id) DO NOTHING;

-- Insert sample business bonds
INSERT INTO business_bonds (business_id, business_name, bond_amount, bank_rate, credit_guarantee_amount)
VALUES 
('BUS_001', 'Snapifi Tech Solutions', 500000.00, 0.0525, 500000.00),
('BUS_002', 'Digital Asset Ventures', 500000.00, 0.0525, 500000.00),
('BUS_003', 'Real Estate Tokenization LLC', 500000.00, 0.0525, 500000.00)
ON CONFLICT (business_id) DO NOTHING;
