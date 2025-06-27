-- Compliance and Institutional Investment Tables
-- This script creates the necessary tables for compliance monitoring and institutional investment tracking

-- Drop existing tables if they exist (for development)
DROP TABLE IF EXISTS compliance_scans CASCADE;
DROP TABLE IF EXISTS compliance_rules CASCADE;
DROP TABLE IF EXISTS compliance_violations CASCADE;
DROP TABLE IF EXISTS institutional_investors CASCADE;
DROP TABLE IF EXISTS institutional_portfolios CASCADE;
DROP TABLE IF EXISTS government_guaranteed_mortgages CASCADE;
DROP TABLE IF EXISTS roi_tracking CASCADE;
DROP TABLE IF EXISTS regulatory_updates CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;

-- Compliance Rules Table
CREATE TABLE compliance_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
    regulation_reference TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Scans Table
CREATE TABLE compliance_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'running', 'completed', 'failed')) NOT NULL,
    overall_score DECIMAL(5,2),
    total_checks INTEGER,
    passed_checks INTEGER,
    failed_checks INTEGER,
    warning_checks INTEGER,
    scan_results JSONB,
    institutional_compliance JSONB,
    recommendations JSONB,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Compliance Violations Table
CREATE TABLE compliance_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES compliance_scans(id),
    rule_id VARCHAR(50) REFERENCES compliance_rules(rule_id),
    violation_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
    description TEXT NOT NULL,
    details JSONB,
    status VARCHAR(20) CHECK (status IN ('open', 'in_progress', 'resolved', 'waived')) DEFAULT 'open',
    resolution_notes TEXT,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    assigned_to UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Institutional Investors Table
CREATE TABLE institutional_investors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_name VARCHAR(255) NOT NULL,
    investor_type VARCHAR(100) NOT NULL, -- 'pension_fund', 'insurance_company', 'sovereign_wealth', 'hedge_fund', etc.
    registration_number VARCHAR(100),
    minimum_investment_met BOOLEAN DEFAULT false,
    current_investment_amount DECIMAL(15,2) DEFAULT 0,
    minimum_required_amount DECIMAL(15,2) DEFAULT 100000000, -- $100M minimum
    qualification_status VARCHAR(50) CHECK (qualification_status IN ('pending', 'qualified', 'disqualified', 'suspended')) DEFAULT 'pending',
    risk_tolerance VARCHAR(20) CHECK (risk_tolerance IN ('conservative', 'moderate', 'aggressive')) DEFAULT 'moderate',
    regulatory_jurisdiction VARCHAR(100),
    contact_information JSONB,
    kyc_status VARCHAR(20) CHECK (kyc_status IN ('pending', 'verified', 'rejected', 'expired')) DEFAULT 'pending',
    aml_status VARCHAR(20) CHECK (aml_status IN ('pending', 'cleared', 'flagged', 'under_review')) DEFAULT 'pending',
    onboarding_date TIMESTAMP WITH TIME ZONE,
    last_review_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Institutional Portfolios Table
CREATE TABLE institutional_portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investor_id UUID REFERENCES institutional_investors(id),
    portfolio_name VARCHAR(255) NOT NULL,
    total_value DECIMAL(15,2) DEFAULT 0,
    government_guaranteed_amount DECIMAL(15,2) DEFAULT 0,
    target_roi DECIMAL(5,2) DEFAULT 20.00, -- 20% target ROI
    actual_roi DECIMAL(5,2) DEFAULT 0,
    compounded_returns DECIMAL(15,2) DEFAULT 0,
    risk_score DECIMAL(5,2) DEFAULT 0,
    diversification_score DECIMAL(5,2) DEFAULT 0,
    liquidity_ratio DECIMAL(5,2) DEFAULT 0,
    performance_metrics JSONB,
    allocation_strategy JSONB,
    rebalancing_frequency VARCHAR(50) DEFAULT 'quarterly',
    last_rebalance_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Government Guaranteed Mortgages Table
CREATE TABLE government_guaranteed_mortgages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES institutional_portfolios(id),
    loan_id VARCHAR(100) UNIQUE NOT NULL,
    loan_type VARCHAR(50) CHECK (loan_type IN ('FHA', 'VA', 'USDA', 'conventional_government_backed')) NOT NULL,
    principal_amount DECIMAL(12,2) NOT NULL,
    interest_rate DECIMAL(5,4) NOT NULL,
    term_months INTEGER NOT NULL,
    guarantee_percentage DECIMAL(5,2) DEFAULT 100.00, -- 100% government guaranteed
    guarantee_agency VARCHAR(100), -- 'FHA', 'VA', 'USDA', 'Fannie Mae', 'Freddie Mac'
    borrower_credit_score INTEGER,
    property_value DECIMAL(12,2),
    loan_to_value_ratio DECIMAL(5,2),
    debt_to_income_ratio DECIMAL(5,2),
    origination_date TIMESTAMP WITH TIME ZONE,
    maturity_date TIMESTAMP WITH TIME ZONE,
    current_balance DECIMAL(12,2),
    payment_status VARCHAR(50) CHECK (payment_status IN ('current', 'late_30', 'late_60', 'late_90', 'default', 'foreclosure')) DEFAULT 'current',
    default_probability DECIMAL(5,4) DEFAULT 0.0200, -- <2% default risk
    monthly_payment DECIMAL(10,2),
    next_payment_date TIMESTAMP WITH TIME ZONE,
    geographic_location VARCHAR(100),
    property_type VARCHAR(50),
    compliance_status VARCHAR(50) DEFAULT 'compliant',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ROI Tracking Table
CREATE TABLE roi_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES institutional_portfolios(id),
    tracking_period VARCHAR(50) NOT NULL, -- 'monthly', 'quarterly', 'annual'
    period_start_date DATE NOT NULL,
    period_end_date DATE NOT NULL,
    beginning_value DECIMAL(15,2) NOT NULL,
    ending_value DECIMAL(15,2) NOT NULL,
    cash_flows DECIMAL(15,2) DEFAULT 0, -- Deposits/withdrawals during period
    gross_return DECIMAL(15,2) NOT NULL,
    net_return DECIMAL(15,2) NOT NULL,
    roi_percentage DECIMAL(5,2) NOT NULL,
    annualized_roi DECIMAL(5,2) NOT NULL,
    benchmark_roi DECIMAL(5,2), -- Comparison benchmark
    excess_return DECIMAL(5,2), -- Return above benchmark
    volatility DECIMAL(5,2),
    sharpe_ratio DECIMAL(5,4),
    government_guarantee_contribution DECIMAL(5,2), -- ROI contribution from gov-guaranteed mortgages
    risk_adjusted_return DECIMAL(5,2),
    compounding_effect DECIMAL(15,2),
    performance_attribution JSONB, -- Breakdown of return sources
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Regulatory Updates Table
CREATE TABLE regulatory_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    regulation_type VARCHAR(100) NOT NULL,
    regulation_name VARCHAR(255) NOT NULL,
    agency VARCHAR(100) NOT NULL, -- 'CFPB', 'OCC', 'FDIC', 'FHA', 'VA', etc.
    update_type VARCHAR(50) CHECK (update_type IN ('new_rule', 'amendment', 'interpretation', 'enforcement', 'guidance')) NOT NULL,
    effective_date DATE,
    description TEXT NOT NULL,
    impact_assessment TEXT,
    compliance_requirements TEXT,
    action_required BOOLEAN DEFAULT false,
    deadline_date DATE,
    affected_loan_types TEXT[],
    institutional_impact_level VARCHAR(20) CHECK (institutional_impact_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    implementation_status VARCHAR(50) CHECK (implementation_status IN ('pending', 'in_progress', 'completed', 'deferred')) DEFAULT 'pending',
    related_documents JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(100) NOT NULL, -- 'compliance_scan', 'portfolio', 'investor', etc.
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'approve', 'reject'
    performed_by UUID,
    old_values JSONB,
    new_values JSONB,
    reason TEXT,
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_compliance_scans_status ON compliance_scans(status);
CREATE INDEX idx_compliance_scans_created_at ON compliance_scans(created_at);
CREATE INDEX idx_compliance_violations_status ON compliance_violations(status);
CREATE INDEX idx_compliance_violations_severity ON compliance_violations(severity);
CREATE INDEX idx_institutional_investors_qualification ON institutional_investors(qualification_status);
CREATE INDEX idx_institutional_investors_investment_amount ON institutional_investors(current_investment_amount);
CREATE INDEX idx_institutional_portfolios_investor ON institutional_portfolios(investor_id);
CREATE INDEX idx_government_mortgages_portfolio ON government_guaranteed_mortgages(portfolio_id);
CREATE INDEX idx_government_mortgages_loan_type ON government_guaranteed_mortgages(loan_type);
CREATE INDEX idx_government_mortgages_payment_status ON government_guaranteed_mortgages(payment_status);
CREATE INDEX idx_roi_tracking_portfolio ON roi_tracking(portfolio_id);
CREATE INDEX idx_roi_tracking_period ON roi_tracking(period_start_date, period_end_date);
CREATE INDEX idx_regulatory_updates_effective_date ON regulatory_updates(effective_date);
CREATE INDEX idx_regulatory_updates_impact_level ON regulatory_updates(institutional_impact_level);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Insert sample compliance rules
INSERT INTO compliance_rules (rule_id, category, description, severity, regulation_reference) VALUES
('KYC-001', 'KYC/AML', 'Customer identity verification and anti-money laundering compliance', 'critical', 'Bank Secrecy Act, USA PATRIOT Act'),
('REG-002', 'Regulatory', 'Federal lending regulations compliance (TILA, RESPA, CFPB)', 'critical', 'Truth in Lending Act, Real Estate Settlement Procedures Act'),
('CAP-003', 'Capital Requirements', 'Minimum institutional investment threshold verification', 'critical', 'Internal Policy - $100M Minimum'),
('ROI-004', 'ROI Compliance', 'Government guaranteed mortgage ROI verification', 'high', 'Internal Policy - 20% Target ROI'),
('DOC-005', 'Documentation', 'Loan documentation and record keeping standards', 'medium', 'CFPB Examination Manual'),
('RISK-006', 'Risk Assessment', 'Credit risk and default probability analysis', 'high', 'Basel III Capital Requirements'),
('GOV-007', 'Government Guarantees', 'Government-backed mortgage verification and compliance', 'critical', 'FHA, VA, USDA Guidelines'),
('LIQ-008', 'Liquidity', 'Portfolio liquidity and cash flow requirements', 'medium', 'Internal Risk Management Policy'),
('DIV-009', 'Diversification', 'Portfolio diversification and concentration limits', 'medium', 'Investment Company Act of 1940'),
('REP-010', 'Reporting', 'Regulatory reporting and disclosure requirements', 'high', 'Securities Exchange Act of 1934');

-- Insert sample institutional investor
INSERT INTO institutional_investors (
    investor_name, 
    investor_type, 
    registration_number, 
    minimum_investment_met, 
    current_investment_amount, 
    qualification_status, 
    risk_tolerance, 
    regulatory_jurisdiction, 
    kyc_status, 
    aml_status, 
    onboarding_date
) VALUES (
    'Horizon Capital Management', 
    'hedge_fund', 
    'SEC-801-12345', 
    true, 
    2847392000.00, 
    'qualified', 
    'moderate', 
    'United States', 
    'verified', 
    'cleared', 
    CURRENT_TIMESTAMP
);

-- Insert sample portfolio
INSERT INTO institutional_portfolios (
    investor_id, 
    portfolio_name, 
    total_value, 
    government_guaranteed_amount, 
    target_roi, 
    actual_roi, 
    compounded_returns
) VALUES (
    (SELECT id FROM institutional_investors WHERE investor_name = 'Horizon Capital Management'),
    'Government Guaranteed Mortgage Portfolio',
    2847392000.00,
    1847392000.00,
    20.00,
    22.40,
    847392000.00
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_compliance_rules_updated_at BEFORE UPDATE ON compliance_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_violations_updated_at BEFORE UPDATE ON compliance_violations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_institutional_investors_updated_at BEFORE UPDATE ON institutional_investors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_institutional_portfolios_updated_at BEFORE UPDATE ON institutional_portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_government_guaranteed_mortgages_updated_at BEFORE UPDATE ON government_guaranteed_mortgages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_regulatory_updates_updated_at BEFORE UPDATE ON regulatory_updates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant appropriate permissions (adjust as needed for your environment)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO snappaifi_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO snappaifi_app;
