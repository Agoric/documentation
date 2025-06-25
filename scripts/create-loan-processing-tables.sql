-- Create loan applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id VARCHAR(50) PRIMARY KEY,
    applicant_id VARCHAR(50) NOT NULL,
    loan_amount DECIMAL(12,2) NOT NULL,
    loan_term INTEGER NOT NULL,
    loan_type VARCHAR(20) NOT NULL,
    property_type VARCHAR(20) NOT NULL,
    property_value DECIMAL(12,2) NOT NULL,
    down_payment DECIMAL(12,2) NOT NULL,
    annual_income DECIMAL(12,2) NOT NULL,
    monthly_debt DECIMAL(10,2) NOT NULL,
    credit_score INTEGER NOT NULL,
    employment_status VARCHAR(20) NOT NULL,
    employment_years INTEGER NOT NULL,
    assets DECIMAL(12,2) NOT NULL,
    liabilities DECIMAL(12,2) NOT NULL,
    property_address TEXT NOT NULL,
    purpose VARCHAR(20) NOT NULL,
    risk_score INTEGER NOT NULL,
    risk_category VARCHAR(20) NOT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    monthly_payment DECIMAL(10,2) NOT NULL,
    loan_to_value DECIMAL(5,2) NOT NULL,
    debt_to_income DECIMAL(5,2) NOT NULL,
    approved BOOLEAN NOT NULL,
    conditions JSONB,
    required_documents JSONB,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create investors table
CREATE TABLE IF NOT EXISTS investors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    min_loan_amount DECIMAL(12,2) NOT NULL,
    max_loan_amount DECIMAL(12,2) NOT NULL,
    preferred_loan_types JSONB,
    risk_tolerance INTEGER NOT NULL,
    target_return DECIMAL(5,2) NOT NULL,
    investment_horizon INTEGER NOT NULL,
    total_capital DECIMAL(15,2) NOT NULL,
    available_capital DECIMAL(15,2) NOT NULL,
    deployed_capital DECIMAL(15,2) DEFAULT 0,
    portfolio_value DECIMAL(15,2) DEFAULT 0,
    total_loans_invested INTEGER DEFAULT 0,
    average_return DECIMAL(5,2) DEFAULT 0,
    default_rate DECIMAL(5,2) DEFAULT 0,
    geographic_preferences JSONB,
    property_types JSONB,
    max_loan_to_value DECIMAL(5,2) NOT NULL,
    min_credit_score INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending_approval',
    verification_status VARCHAR(20) DEFAULT 'pending',
    accredited_investor BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create investment opportunities table
CREATE TABLE IF NOT EXISTS investment_opportunities (
    id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL REFERENCES loan_applications(id),
    investor_id VARCHAR(50) NOT NULL REFERENCES investors(id),
    loan_amount DECIMAL(12,2) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,
    expected_return DECIMAL(10,2) NOT NULL,
    match_score INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    accepted_at TIMESTAMP,
    declined_at TIMESTAMP
);

-- Create investor loans table (for tracking active investments)
CREATE TABLE IF NOT EXISTS investor_loans (
    id VARCHAR(50) PRIMARY KEY,
    investor_id VARCHAR(50) NOT NULL REFERENCES investors(id),
    application_id VARCHAR(50) NOT NULL REFERENCES loan_applications(id),
    investment_amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,3) NOT NULL,
    monthly_payment DECIMAL(10,2) NOT NULL,
    remaining_balance DECIMAL(12,2) NOT NULL,
    loan_status VARCHAR(20) DEFAULT 'current',
    next_payment_date DATE NOT NULL,
    total_return DECIMAL(10,2) DEFAULT 0,
    actual_return DECIMAL(5,2) DEFAULT 0,
    days_late INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create loan workflow table
CREATE TABLE IF NOT EXISTS loan_workflow (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL REFERENCES loan_applications(id),
    step_name VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    step_order INTEGER NOT NULL,
    assigned_to VARCHAR(100),
    completed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create loan documents table
CREATE TABLE IF NOT EXISTS loan_documents (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL REFERENCES loan_applications(id),
    document_type VARCHAR(50) NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending_review',
    reviewed_by VARCHAR(50),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);
CREATE INDEX IF NOT EXISTS idx_loan_applications_applicant ON loan_applications(applicant_id);
CREATE INDEX IF NOT EXISTS idx_investors_status ON investors(status);
CREATE INDEX IF NOT EXISTS idx_investors_capital ON investors(available_capital);
CREATE INDEX IF NOT EXISTS idx_investment_opportunities_status ON investment_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_investor_loans_status ON investor_loans(loan_status);
CREATE INDEX IF NOT EXISTS idx_loan_workflow_application ON loan_workflow(application_id);
