-- Setup Snapifi Loan Processing Database
-- Version 2.0 - Enhanced with better error handling

-- Create loan applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id VARCHAR(50) PRIMARY KEY,
    applicant_id VARCHAR(50) NOT NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    loan_term INTEGER NOT NULL,
    loan_type VARCHAR(20) NOT NULL CHECK (loan_type IN ('50-year', '30-year', '15-year', 'commercial', 'investment')),
    property_type VARCHAR(20) NOT NULL CHECK (property_type IN ('primary', 'secondary', 'investment', 'commercial')),
    property_value DECIMAL(12,2) NOT NULL,
    down_payment DECIMAL(12,2) NOT NULL,
    annual_income DECIMAL(12,2) NOT NULL,
    monthly_debt DECIMAL(10,2) NOT NULL,
    credit_score INTEGER NOT NULL CHECK (credit_score >= 300 AND credit_score <= 850),
    employment_status VARCHAR(20) NOT NULL CHECK (employment_status IN ('employed', 'self-employed', 'retired', 'unemployed')),
    employment_years INTEGER NOT NULL,
    assets DECIMAL(12,2) NOT NULL,
    liabilities DECIMAL(12,2) NOT NULL,
    property_address TEXT NOT NULL,
    purpose VARCHAR(20) NOT NULL CHECK (purpose IN ('purchase', 'refinance', 'cash-out')),
    risk_score INTEGER NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
    risk_category VARCHAR(20) NOT NULL CHECK (risk_category IN ('low', 'medium', 'high', 'very-high')),
    interest_rate DECIMAL(5,3) NOT NULL,
    monthly_payment DECIMAL(10,2) NOT NULL,
    loan_to_value DECIMAL(5,2) NOT NULL,
    debt_to_income DECIMAL(5,2) NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    conditions JSONB DEFAULT '[]'::jsonb,
    required_documents JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'funded', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investors table
CREATE TABLE IF NOT EXISTS investors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('individual', 'institutional', 'fund', 'bank', 'credit_union')),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    min_loan_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    max_loan_amount DECIMAL(12,2) NOT NULL DEFAULT 10000000,
    preferred_loan_types JSONB DEFAULT '[]'::jsonb,
    risk_tolerance INTEGER NOT NULL CHECK (risk_tolerance >= 0 AND risk_tolerance <= 100),
    target_return DECIMAL(5,2) NOT NULL,
    investment_horizon INTEGER NOT NULL,
    total_capital DECIMAL(15,2) NOT NULL,
    available_capital DECIMAL(15,2) NOT NULL,
    deployed_capital DECIMAL(15,2) DEFAULT 0,
    portfolio_value DECIMAL(15,2) DEFAULT 0,
    total_loans_invested INTEGER DEFAULT 0,
    average_return DECIMAL(5,2) DEFAULT 0,
    default_rate DECIMAL(5,2) DEFAULT 0,
    geographic_preferences JSONB DEFAULT '[]'::jsonb,
    property_types JSONB DEFAULT '[]'::jsonb,
    max_loan_to_value DECIMAL(5,2) NOT NULL DEFAULT 95.00,
    min_credit_score INTEGER NOT NULL DEFAULT 600,
    status VARCHAR(20) DEFAULT 'pending_approval' CHECK (status IN ('active', 'inactive', 'suspended', 'pending_approval')),
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'rejected')),
    accredited_investor BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create investment opportunities table
CREATE TABLE IF NOT EXISTS investment_opportunities (
    id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    investor_id VARCHAR(50) NOT NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,
    expected_return DECIMAL(10,2) NOT NULL,
    match_score INTEGER NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE,
    declined_at TIMESTAMP WITH TIME ZONE
);

-- Create investor loans table (for tracking active investments)
CREATE TABLE IF NOT EXISTS investor_loans (
    id VARCHAR(50) PRIMARY KEY,
    investor_id VARCHAR(50) NOT NULL,
    application_id VARCHAR(50) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    monthly_payment DECIMAL(10,2) NOT NULL,
    remaining_balance DECIMAL(12,2) NOT NULL,
    loan_status VARCHAR(20) DEFAULT 'current' CHECK (loan_status IN ('current', 'late', 'defaulted', 'paid_off')),
    next_payment_date DATE NOT NULL,
    total_return DECIMAL(10,2) DEFAULT 0,
    actual_return DECIMAL(5,2) DEFAULT 0,
    days_late INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan workflow table
CREATE TABLE IF NOT EXISTS loan_workflow (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    step_name VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    step_order INTEGER NOT NULL,
    assigned_to VARCHAR(100),
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan documents table
CREATE TABLE IF NOT EXISTS loan_documents (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    document_type VARCHAR(50) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected', 'requires_update')),
    reviewed_by VARCHAR(50),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraints after tables are created
DO $$ 
BEGIN
    -- Add foreign key for investment_opportunities -> loan_applications
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_investment_opportunities_application'
    ) THEN
        ALTER TABLE investment_opportunities 
        ADD CONSTRAINT fk_investment_opportunities_application 
        FOREIGN KEY (application_id) REFERENCES loan_applications(id);
    END IF;

    -- Add foreign key for investment_opportunities -> investors
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_investment_opportunities_investor'
    ) THEN
        ALTER TABLE investment_opportunities 
        ADD CONSTRAINT fk_investment_opportunities_investor 
        FOREIGN KEY (investor_id) REFERENCES investors(id);
    END IF;

    -- Add foreign key for investor_loans -> investors
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_investor_loans_investor'
    ) THEN
        ALTER TABLE investor_loans 
        ADD CONSTRAINT fk_investor_loans_investor 
        FOREIGN KEY (investor_id) REFERENCES investors(id);
    END IF;

    -- Add foreign key for investor_loans -> loan_applications
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_investor_loans_application'
    ) THEN
        ALTER TABLE investor_loans 
        ADD CONSTRAINT fk_investor_loans_application 
        FOREIGN KEY (application_id) REFERENCES loan_applications(id);
    END IF;

    -- Add foreign key for loan_workflow -> loan_applications
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_loan_workflow_application'
    ) THEN
        ALTER TABLE loan_workflow 
        ADD CONSTRAINT fk_loan_workflow_application 
        FOREIGN KEY (application_id) REFERENCES loan_applications(id);
    END IF;

    -- Add foreign key for loan_documents -> loan_applications
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'fk_loan_documents_application'
    ) THEN
        ALTER TABLE loan_documents 
        ADD CONSTRAINT fk_loan_documents_application 
        FOREIGN KEY (application_id) REFERENCES loan_applications(id);
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_applicant ON loan_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_created ON loan_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_investors_status ON investors(status);
CREATE INDEX IF NOT EXISTS idx_investors_capital ON investors(available_capital);
CREATE INDEX IF NOT EXISTS idx_investors_email ON investors(email);
CREATE INDEX IF NOT EXISTS idx_investment_opportunities_status ON investment_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_investment_opportunities_expires ON investment_opportunities(expires_at);
CREATE INDEX IF NOT EXISTS idx_investor_loans_status ON investor_loans(loan_status);
CREATE INDEX IF NOT EXISTS idx_investor_loans_investor ON investor_loans(investor_id);
CREATE INDEX IF NOT EXISTS idx_loan_workflow_application ON loan_workflow(application_id);
CREATE INDEX IF NOT EXISTS idx_loan_workflow_status ON loan_workflow(status);
CREATE INDEX IF NOT EXISTS idx_loan_documents_application ON loan_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_loan_documents_status ON loan_documents(status);

-- Insert some sample data for testing
INSERT INTO investors (
    id, name, type, email, phone, address,
    min_loan_amount, max_loan_amount, preferred_loan_types,
    risk_tolerance, target_return, investment_horizon,
    total_capital, available_capital, geographic_preferences,
    property_types, max_loan_to_value, min_credit_score,
    status, verification_status, accredited_investor
) VALUES 
(
    'INV-SAMPLE-001', 'Snapifi Capital Fund', 'fund', 'fund@snapifi.com', 
    '+1-555-0100', '123 Financial District, New York, NY 10004',
    100000, 5000000, '["50-year", "30-year", "commercial"]'::jsonb,
    75, 8.5, 10, 50000000, 45000000, '["New York", "California", "Texas"]'::jsonb,
    '["primary", "investment", "commercial"]'::jsonb, 90.00, 650,
    'active', 'verified', true
),
(
    'INV-SAMPLE-002', 'Diamond Investment Group', 'institutional', 'invest@diamond.com',
    '+1-555-0200', '456 Investment Ave, Los Angeles, CA 90210',
    50000, 2000000, '["50-year", "investment"]'::jsonb,
    60, 7.5, 15, 25000000, 20000000, '["California", "Nevada", "Arizona"]'::jsonb,
    '["investment", "secondary"]'::jsonb, 85.00, 700,
    'active', 'verified', true
),
(
    'INV-SAMPLE-003', 'Royal Credit Union', 'credit_union', 'loans@royal.cu',
    '+1-555-0300', '789 Community Blvd, Austin, TX 78701',
    25000, 1000000, '["30-year", "15-year"]'::jsonb,
    50, 6.5, 20, 15000000, 12000000, '["Texas", "Oklahoma", "Louisiana"]'::jsonb,
    '["primary", "secondary"]'::jsonb, 95.00, 620,
    'active', 'verified', false
);

-- Create a view for loan application summary
CREATE OR REPLACE VIEW loan_application_summary AS
SELECT 
    la.id,
    la.applicant_id,
    la.loan_amount,
    la.loan_type,
    la.property_type,
    la.credit_score,
    la.risk_category,
    la.interest_rate,
    la.approved,
    la.status,
    la.created_at,
    COUNT(io.id) as investor_opportunities,
    COUNT(CASE WHEN io.status = 'accepted' THEN 1 END) as accepted_opportunities,
    SUM(CASE WHEN io.status = 'accepted' THEN io.investment_amount ELSE 0 END) as total_funding
FROM loan_applications la
LEFT JOIN investment_opportunities io ON la.id = io.application_id
GROUP BY la.id, la.applicant_id, la.loan_amount, la.loan_type, la.property_type, 
         la.credit_score, la.risk_category, la.interest_rate, la.approved, la.status, la.created_at;

-- Create a view for investor portfolio summary
CREATE OR REPLACE VIEW investor_portfolio_summary AS
SELECT 
    i.id,
    i.name,
    i.type,
    i.total_capital,
    i.available_capital,
    i.deployed_capital,
    i.status,
    COUNT(il.id) as active_loans,
    SUM(il.investment_amount) as total_invested,
    SUM(il.remaining_balance) as total_outstanding,
    AVG(il.interest_rate) as avg_interest_rate,
    COUNT(CASE WHEN il.loan_status = 'current' THEN 1 END) as current_loans,
    COUNT(CASE WHEN il.loan_status = 'late' THEN 1 END) as late_loans,
    COUNT(CASE WHEN il.loan_status = 'defaulted' THEN 1 END) as defaulted_loans
FROM investors i
LEFT JOIN investor_loans il ON i.id = il.investor_id
GROUP BY i.id, i.name, i.type, i.total_capital, i.available_capital, i.deployed_capital, i.status;

-- Success message
SELECT 'Snapifi Loan Processing Database Setup Complete!' as message,
       'Tables created: loan_applications, investors, investment_opportunities, investor_loans, loan_workflow, loan_documents' as tables_created,
       'Sample investors added: 3' as sample_data,
       'Views created: loan_application_summary, investor_portfolio_summary' as views_created;
