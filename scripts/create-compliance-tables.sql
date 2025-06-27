-- Institutional Loan Compliance Database Schema
-- Minimum Investment: $100M | Target ROI: 20% Compounded

-- Compliance Scans Table
CREATE TABLE IF NOT EXISTS compliance_scans (
    id SERIAL PRIMARY KEY,
    loan_id VARCHAR(50) NOT NULL,
    portfolio_id VARCHAR(50),
    scan_type VARCHAR(20) NOT NULL CHECK (scan_type IN ('institutional', 'government', 'roi', 'full')),
    overall_score DECIMAL(5,2) NOT NULL,
    investment_amount BIGINT NOT NULL, -- Minimum $100M = 100000000
    expected_roi DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    actual_roi DECIMAL(5,2),
    compliance_status VARCHAR(20) DEFAULT 'pending' CHECK (compliance_status IN ('pending', 'compliant', 'non_compliant', 'under_review')),
    government_guarantee_validated BOOLEAN DEFAULT FALSE,
    institutional_requirements_met BOOLEAN DEFAULT FALSE,
    roi_target_achieved BOOLEAN DEFAULT FALSE,
    results JSONB, -- Detailed scan results
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days'),
    
    -- Constraints
    CONSTRAINT min_investment_check CHECK (investment_amount >= 100000000), -- $100M minimum
    CONSTRAINT roi_range_check CHECK (expected_roi >= 0 AND expected_roi <= 50)
);

-- Government Bond Structures Table
CREATE TABLE IF NOT EXISTS government_bond_structures (
    id SERIAL PRIMARY KEY,
    bond_type VARCHAR(10) NOT NULL CHECK (bond_type IN ('FHA', 'VA', 'USDA', 'SBA')),
    term_years INTEGER NOT NULL,
    government_guarantee_rate DECIMAL(5,2) NOT NULL, -- 85-100%
    minimum_investment BIGINT NOT NULL DEFAULT 100000000, -- $100M
    expected_roi DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    compounded_interest_rate DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    compliance_requirements JSONB NOT NULL,
    risk_rating VARCHAR(10) DEFAULT 'LOW' CHECK (risk_rating IN ('LOW', 'MEDIUM', 'HIGH')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(bond_type, term_years)
);

-- Institutional Portfolios Table
CREATE TABLE IF NOT EXISTS institutional_portfolios (
    id SERIAL PRIMARY KEY,
    portfolio_id VARCHAR(50) UNIQUE NOT NULL,
    institution_name VARCHAR(200) NOT NULL,
    institution_type VARCHAR(50) NOT NULL, -- 'BANK', 'INSURANCE', 'PENSION', 'SOVEREIGN_WEALTH', etc.
    total_investment BIGINT NOT NULL,
    total_investment BIGINT NOT NULL,
    available_capital BIGINT NOT NULL,
    target_roi DECIMAL(5,2) NOT NULL DEFAULT 20.00,
    actual_roi DECIMAL(5,2),
    risk_tolerance VARCHAR(10) DEFAULT 'MEDIUM' CHECK (risk_tolerance IN ('LOW', 'MEDIUM', 'HIGH')),
    diversification_score DECIMAL(5,2),
    government_bond_allocation DECIMAL(5,2), -- Percentage in government bonds
    compliance_score DECIMAL(5,2),
    accreditation_status VARCHAR(20) DEFAULT 'PENDING' CHECK (accreditation_status IN ('PENDING', 'VERIFIED', 'EXPIRED')),
    regulatory_status VARCHAR(20) DEFAULT 'COMPLIANT' CHECK (regulatory_status IN ('COMPLIANT', 'NON_COMPLIANT', 'UNDER_REVIEW')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT min_institutional_investment CHECK (total_investment >= 100000000), -- $100M minimum
    CONSTRAINT available_capital_check CHECK (available_capital >= 0),
    CONSTRAINT roi_target_check CHECK (target_roi >= 0 AND target_roi <= 50)
);

-- Compliance Alerts Table
CREATE TABLE IF NOT EXISTS compliance_alerts (
    id SERIAL PRIMARY KEY,
    alert_id VARCHAR(50) UNIQUE NOT NULL,
    portfolio_id VARCHAR(50) REFERENCES institutional_portfolios(portfolio_id),
    loan_id VARCHAR(50),
    alert_type VARCHAR(50) NOT NULL, -- 'INVESTMENT_THRESHOLD', 'ROI_OPTIMIZATION', 'GOVERNMENT_GUARANTEE', etc.
    severity VARCHAR(10) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    bond_type VARCHAR(10) CHECK (bond_type IN ('FHA', 'VA', 'USDA', 'SBA')),
    investment_amount BIGINT,
    expected_roi DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED', 'INVESTIGATING', 'DISMISSED')),
    assigned_to VARCHAR(100),
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    
    -- Indexes for performance
    INDEX idx_alerts_portfolio (portfolio_id),
    INDEX idx_alerts_status (status),
    INDEX idx_alerts_severity (severity),
    INDEX idx_alerts_created (created_at)
);

-- Compliance Rules Table
CREATE TABLE IF NOT EXISTS compliance_rules (
    id SERIAL PRIMARY KEY,
    rule_id VARCHAR(50) UNIQUE NOT NULL,
    rule_name VARCHAR(200) NOT NULL,
    rule_category VARCHAR(50) NOT NULL, -- 'INSTITUTIONAL', 'GOVERNMENT_BOND', 'ROI', 'REGULATORY'
    bond_type VARCHAR(10) CHECK (bond_type IN ('FHA', 'VA', 'USDA', 'SBA', 'ALL')),
    rule_description TEXT NOT NULL,
    validation_logic JSONB NOT NULL, -- JSON structure defining validation logic
    severity VARCHAR(10) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    minimum_investment_threshold BIGINT DEFAULT 100000000,
    roi_threshold DECIMAL(5,2) DEFAULT 20.00,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Trail Table
CREATE TABLE IF NOT EXISTS compliance_audit_trail (
    id SERIAL PRIMARY KEY,
    portfolio_id VARCHAR(50),
    loan_id VARCHAR(50),
    action_type VARCHAR(50) NOT NULL, -- 'SCAN', 'ALERT_CREATED', 'ALERT_RESOLVED', 'RULE_UPDATED', etc.
    performed_by VARCHAR(100) NOT NULL,
    action_details JSONB,
    before_state JSONB,
    after_state JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Indexes for audit queries
    INDEX idx_audit_portfolio (portfolio_id),
    INDEX idx_audit_action (action_type),
    INDEX idx_audit_user (performed_by),
    INDEX idx_audit_date (created_at)
);

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS compliance_performance_metrics (
    id SERIAL PRIMARY KEY,
    metric_date DATE NOT NULL,
    total_portfolios INTEGER NOT NULL DEFAULT 0,
    compliant_portfolios INTEGER NOT NULL DEFAULT 0,
    total_investment_amount BIGINT NOT NULL DEFAULT 0,
    average_roi DECIMAL(5,2) NOT NULL DEFAULT 0,
    government_bond_compliance_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
    institutional_compliance_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
    total_compounded_revenue BIGINT NOT NULL DEFAULT 0,
    monthly_revenue BIGINT NOT NULL DEFAULT 0,
    active_alerts INTEGER NOT NULL DEFAULT 0,
    resolved_alerts INTEGER NOT NULL DEFAULT 0,
    average_processing_time_hours DECIMAL(8,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint on date
    UNIQUE(metric_date)
);

-- Insert Default Government Bond Structures
INSERT INTO government_bond_structures (bond_type, term_years, government_guarantee_rate, minimum_investment, expected_roi, compounded_interest_rate, compliance_requirements) VALUES
('FHA', 30, 100.00, 100000000, 20.00, 20.00, '{
    "requirements": [
        "Owner-occupied primary residence",
        "Debt-to-income ratio ≤ 43%",
        "Credit score ≥ 580 (3.5% down) or ≥ 500 (10% down)",
        "Property appraisal and inspection",
        "Mortgage insurance premium",
        "Institutional investment ≥ $100M",
        "Government guarantee validation"
    ],
    "documentation": [
        "FHA case number",
        "Borrower employment verification",
        "Property appraisal report",
        "Mortgage insurance certificate"
    ]
}'),
('VA', 50, 100.00, 100000000, 20.00, 20.00, '{
    "requirements": [
        "Eligible veteran or service member",
        "Certificate of Eligibility (COE)",
        "Primary residence requirement",
        "No down payment required",
        "No private mortgage insurance",
        "Institutional investment ≥ $100M",
        "VA funding fee compliance"
    ],
    "documentation": [
        "Certificate of Eligibility",
        "DD-214 or service verification",
        "VA funding fee documentation",
        "Property eligibility verification"
    ]
}'),
('USDA', 35, 90.00, 100000000, 20.00, 20.00, '{
    "requirements": [
        "Rural area eligibility",
        "Income limits (115% of median area income)",
        "Primary residence requirement",
        "No down payment option",
        "Property eligibility verification",
        "Institutional investment ≥ $100M",
        "USDA guarantee fee compliance"
    ],
    "documentation": [
        "Rural area certification",
        "Income verification documents",
        "USDA property eligibility letter",
        "Guarantee fee documentation"
    ]
}'),
('SBA', 25, 85.00, 100000000, 20.00, 20.00, '{
    "requirements": [
        "Small business eligibility",
        "Owner-occupied commercial property",
        "Business cash flow analysis",
        "Personal guarantee requirements",
        "SBA 504 program compliance",
        "Institutional investment ≥ $100M",
        "Third-party lender participation"
    ],
    "documentation": [
        "SBA eligibility certification",
        "Business financial statements",
        "Personal guarantee documents",
        "Third-party lender commitment"
    ]
}');

-- Insert Default Compliance Rules
INSERT INTO compliance_rules (rule_id, rule_name, rule_category, bond_type, rule_description, validation_logic, severity, minimum_investment_threshold, roi_threshold) VALUES
('INST-MIN-INV', 'Minimum Institutional Investment', 'INSTITUTIONAL', 'ALL', 'Portfolio must meet $100M minimum investment requirement', '{"check": "investment_amount", "operator": ">=", "value": 100000000}', 'CRITICAL', 100000000, 20.00),
('ROI-TARGET', 'Target ROI Achievement', 'ROI', 'ALL', 'Portfolio must achieve 20% compounded annual ROI', '{"check": "actual_roi", "operator": ">=", "value": 20.0}', 'HIGH', 100000000, 20.00),
('GOV-GUARANTEE', 'Government Guarantee Validation', 'GOVERNMENT_BOND', 'ALL', 'Government guarantee must be validated and active', '{"check": "government_guarantee_validated", "operator": "==", "value": true}', 'CRITICAL', 100000000, 20.00),
('FHA-COMPLIANCE', 'FHA Bond Compliance', 'GOVERNMENT_BOND', 'FHA', 'FHA 30-year bond structure compliance', '{"check": "fha_requirements", "operator": "all_met", "value": true}', 'HIGH', 100000000, 20.00),
('VA-COMPLIANCE', 'VA Bond Compliance', 'GOVERNMENT_BOND', 'VA', 'VA 50-year bond structure compliance', '{"check": "va_requirements", "operator": "all_met", "value": true}', 'HIGH', 100000000, 20.00),
('USDA-COMPLIANCE', 'USDA Bond Compliance', 'GOVERNMENT_BOND', 'USDA', 'USDA 35-year bond structure compliance', '{"check": "usda_requirements", "operator": "all_met", "value": true}', 'HIGH', 100000000, 20.00),
('SBA-COMPLIANCE', 'SBA Bond Compliance', 'GOVERNMENT_BOND', 'SBA', 'SBA 25-year bond structure compliance', '{"check": "sba_requirements", "operator": "all_met", "value": true}', 'HIGH', 100000000, 20.00);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_compliance_scans_loan_id ON compliance_scans(loan_id);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_portfolio_id ON compliance_scans(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_status ON compliance_scans(compliance_status);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_created ON compliance_scans(created_at);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_investment ON compliance_scans(investment_amount);

CREATE INDEX IF NOT EXISTS idx_portfolios_institution ON institutional_portfolios(institution_name);
CREATE INDEX IF NOT EXISTS idx_portfolios_investment ON institutional_portfolios(total_investment);
CREATE INDEX IF NOT EXISTS idx_portfolios_compliance ON institutional_portfolios(compliance_score);

-- Create Views for Reporting
CREATE OR REPLACE VIEW compliance_dashboard_summary AS
SELECT 
    COUNT(*) as total_portfolios,
    COUNT(CASE WHEN compliance_score >= 95 THEN 1 END) as compliant_portfolios,
    ROUND(AVG(compliance_score), 2) as average_compliance_score,
    SUM(total_investment) as total_investment_amount,
    ROUND(AVG(actual_roi), 2) as average_roi,
    COUNT(CASE WHEN total_investment >= 100000000 THEN 1 END) as institutional_grade_portfolios,
    ROUND(AVG(CASE WHEN total_investment >= 100000000 THEN actual_roi END), 2) as institutional_average_roi
FROM institutional_portfolios 
WHERE regulatory_status = 'COMPLIANT';

CREATE OR REPLACE VIEW government_bond_performance AS
SELECT 
    gbs.bond_type,
    gbs.term_years,
    gbs.government_guarantee_rate,
    gbs.expected_roi,
    COUNT(cs.id) as total_scans,
    ROUND(AVG(cs.overall_score), 2) as average_compliance_score,
    ROUND(AVG(cs.actual_roi), 2) as average_actual_roi,
    COUNT(CASE WHEN cs.government_guarantee_validated = true THEN 1 END) as validated_guarantees
FROM government_bond_structures gbs
LEFT JOIN compliance_scans cs ON cs.results->>'bondType' = gbs.bond_type
WHERE gbs.active = true
GROUP BY gbs.bond_type, gbs.term_years, gbs.government_guarantee_rate, gbs.expected_roi;

-- Grant appropriate permissions (adjust as needed for your environment)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO compliance_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO compliance_user;
