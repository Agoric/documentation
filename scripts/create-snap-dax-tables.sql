-- Create comprehensive SNAP DAX database schema

-- QGI Bonds for Citizens
CREATE TABLE qgi_citizen_bonds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citizen_id VARCHAR(50) UNIQUE NOT NULL,
    bond_amount DECIMAL(15,2) DEFAULT 250000.00,
    bank_rate DECIMAL(5,4) NOT NULL,
    purchase_date TIMESTAMP DEFAULT NOW(),
    maturity_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    leverage_ratio DECIMAL(5,2) DEFAULT 60.00,
    available_lending_capacity DECIMAL(15,2),
    current_utilization DECIMAL(15,2) DEFAULT 0,
    government_guarantee_id VARCHAR(100),
    domicile_registration_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Business Bonds for Domicile Registered Businesses
CREATE TABLE business_bonds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id VARCHAR(50) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    bond_amount DECIMAL(15,2) DEFAULT 500000.00,
    bank_rate DECIMAL(5,4) NOT NULL,
    purchase_date TIMESTAMP DEFAULT NOW(),
    maturity_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    credit_guarantee_amount DECIMAL(15,2),
    current_credit_utilization DECIMAL(15,2) DEFAULT 0,
    sba_program_id VARCHAR(100),
    government_guarantee_id VARCHAR(100),
    domicile_registration_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Government Program Registry
CREATE TABLE government_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_code VARCHAR(50) UNIQUE NOT NULL,
    program_name VARCHAR(255) NOT NULL,
    agency VARCHAR(100) NOT NULL, -- SBA, HUD, Treasury, Fed, etc.
    program_type VARCHAR(50) NOT NULL, -- guarantee, buyback, capital, etc.
    max_loan_amount DECIMAL(15,2),
    min_loan_amount DECIMAL(15,2),
    interest_rate_cap DECIMAL(5,4),
    guarantee_percentage DECIMAL(5,2),
    eligibility_criteria JSONB,
    required_documentation JSONB,
    processing_timeline_days INTEGER,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Loan Program Matching
CREATE TABLE loan_program_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    loan_application_id VARCHAR(100) NOT NULL,
    program_id UUID REFERENCES government_programs(id),
    match_score DECIMAL(5,2), -- 0-100 compatibility score
    auto_matched BOOLEAN DEFAULT false,
    manual_override BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    program_loan_number VARCHAR(100),
    guarantee_amount DECIMAL(15,2),
    guarantee_percentage DECIMAL(5,2),
    processing_notes TEXT,
    assigned_officer VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Digital Asset Exchange Transactions
CREATE TABLE dax_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_type VARCHAR(50) NOT NULL, -- bond_purchase, leverage_deployment, loan_funding
    from_account VARCHAR(100),
    to_account VARCHAR(100),
    asset_type VARCHAR(50), -- QGI_BOND, BUSINESS_BOND, LEVERAGED_POSITION
    amount DECIMAL(15,2) NOT NULL,
    leverage_ratio DECIMAL(5,2),
    underlying_bond_id UUID,
    loan_application_id VARCHAR(100),
    government_program_id UUID,
    transaction_hash VARCHAR(255),
    block_number BIGINT,
    gas_fee DECIMAL(15,8),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    confirmed_at TIMESTAMP
);

-- Leverage Management
CREATE TABLE leverage_positions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bond_id UUID, -- References either qgi_citizen_bonds or business_bonds
    bond_type VARCHAR(20) NOT NULL, -- 'citizen' or 'business'
    base_amount DECIMAL(15,2) NOT NULL,
    leverage_ratio DECIMAL(5,2) NOT NULL,
    leveraged_amount DECIMAL(15,2) NOT NULL,
    current_utilization DECIMAL(15,2) DEFAULT 0,
    available_capacity DECIMAL(15,2),
    risk_score DECIMAL(5,2),
    margin_requirement DECIMAL(5,2),
    liquidation_threshold DECIMAL(5,2),
    active_loans INTEGER DEFAULT 0,
    total_loan_value DECIMAL(15,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Government Program Integration Log
CREATE TABLE program_integration_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    loan_application_id VARCHAR(100) NOT NULL,
    program_code VARCHAR(50) NOT NULL,
    integration_type VARCHAR(50), -- auto_match, manual_assign, api_sync
    request_payload JSONB,
    response_payload JSONB,
    status VARCHAR(20), -- success, failed, pending
    error_message TEXT,
    processing_time_ms INTEGER,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Domicile Registration
CREATE TABLE domicile_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_id VARCHAR(100) UNIQUE NOT NULL,
    entity_type VARCHAR(20) NOT NULL, -- 'citizen' or 'business'
    entity_id VARCHAR(100) NOT NULL,
    entity_name VARCHAR(255),
    registration_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active',
    bond_eligible BOOLEAN DEFAULT true,
    qgi_bond_id UUID,
    business_bond_id UUID,
    government_benefits JSONB,
    compliance_status VARCHAR(20) DEFAULT 'compliant',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert Government Programs
INSERT INTO government_programs (program_code, program_name, agency, program_type, max_loan_amount, min_loan_amount, guarantee_percentage, eligibility_criteria) VALUES
('SBA_7A', 'SBA 7(a) Loan Program', 'SBA', 'guarantee', 5000000, 25000, 85.00, '{"credit_score_min": 680, "business_age_months": 24, "collateral_required": true}'),
('SBA_504', 'SBA 504 Loan Program', 'SBA', 'guarantee', 5500000, 125000, 90.00, '{"owner_occupied": true, "job_creation": true, "fixed_assets": true}'),
('HUD_FHA', 'FHA Mortgage Insurance', 'HUD', 'guarantee', 970800, 100000, 96.50, '{"primary_residence": true, "debt_to_income_max": 57, "credit_score_min": 580}'),
('USDA_RD', 'USDA Rural Development', 'USDA', 'guarantee', 500000, 50000, 90.00, '{"rural_area": true, "income_limits": true, "primary_residence": true}'),
('VA_HOME', 'VA Home Loan Guarantee', 'VA', 'guarantee', 1000000, 50000, 100.00, '{"veteran_status": true, "certificate_eligibility": true}'),
('TREASURY_CDFI', 'Treasury CDFI Fund', 'Treasury', 'capital', 2000000, 100000, 0.00, '{"community_development": true, "underserved_areas": true}'),
('FED_DISCOUNT', 'Federal Reserve Discount Window', 'Federal Reserve', 'liquidity', 10000000, 1000000, 0.00, '{"depository_institution": true, "collateral_required": true}'),
('HUD_CDBG', 'Community Development Block Grant', 'HUD', 'grant', 500000, 25000, 0.00, '{"community_development": true, "low_income_benefit": true}');

-- Create indexes for performance
CREATE INDEX idx_qgi_bonds_citizen ON qgi_citizen_bonds(citizen_id);
CREATE INDEX idx_business_bonds_business ON business_bonds(business_id);
CREATE INDEX idx_loan_matches_application ON loan_program_matches(loan_application_id);
CREATE INDEX idx_dax_transactions_type ON dax_transactions(transaction_type);
CREATE INDEX idx_leverage_positions_bond ON leverage_positions(bond_id, bond_type);
CREATE INDEX idx_domicile_registrations_entity ON domicile_registrations(entity_type, entity_id);
