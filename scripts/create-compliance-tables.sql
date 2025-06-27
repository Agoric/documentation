-- Compliance Bot Tables for Institutional Lending

-- Compliance bot interaction logs
CREATE TABLE IF NOT EXISTS compliance_bot_logs (
    id SERIAL PRIMARY KEY,
    institution_id VARCHAR(100) NOT NULL,
    query TEXT NOT NULL,
    response TEXT NOT NULL,
    confidence INTEGER,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Regulatory compliance tracking
CREATE TABLE IF NOT EXISTS regulatory_compliance (
    id SERIAL PRIMARY KEY,
    regulation_name VARCHAR(255) NOT NULL,
    regulation_code VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    compliance_status VARCHAR(50) DEFAULT 'pending',
    last_checked TIMESTAMP,
    next_review TIMESTAMP,
    risk_level VARCHAR(20) DEFAULT 'medium',
    institution_id VARCHAR(100),
    loan_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Compliance rules and requirements
CREATE TABLE IF NOT EXISTS compliance_rules (
    id SERIAL PRIMARY KEY,
    rule_name VARCHAR(255) NOT NULL,
    rule_code VARCHAR(100) UNIQUE NOT NULL,
    regulation_id INTEGER REFERENCES regulatory_compliance(id),
    rule_description TEXT,
    rule_type VARCHAR(50), -- 'mandatory', 'recommended', 'conditional'
    automation_level VARCHAR(50), -- 'automatic', 'semi-automatic', 'manual'
    check_frequency VARCHAR(50), -- 'real-time', 'daily', 'weekly', 'monthly'
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance violations and exceptions
CREATE TABLE IF NOT EXISTS compliance_violations (
    id SERIAL PRIMARY KEY,
    rule_id INTEGER REFERENCES compliance_rules(id),
    loan_id VARCHAR(100),
    institution_id VARCHAR(100),
    violation_type VARCHAR(100),
    severity VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    description TEXT,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'investigating', 'resolved', 'waived'
    detected_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    assigned_to VARCHAR(100)
);

-- Regulatory updates and changes
CREATE TABLE IF NOT EXISTS regulatory_updates (
    id SERIAL PRIMARY KEY,
    agency VARCHAR(100) NOT NULL,
    update_title VARCHAR(255) NOT NULL,
    update_type VARCHAR(50), -- 'guidance', 'rule', 'interpretation', 'enforcement'
    effective_date DATE,
    impact_level VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    summary TEXT,
    full_text TEXT,
    affected_regulations TEXT[], -- Array of regulation codes
    implementation_deadline DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Compliance audit trail
CREATE TABLE IF NOT EXISTS compliance_audit_trail (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50), -- 'loan', 'institution', 'rule', 'violation'
    entity_id VARCHAR(100),
    action VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    performed_by VARCHAR(100),
    performed_at TIMESTAMP DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- Document compliance tracking
CREATE TABLE IF NOT EXISTS document_compliance (
    id SERIAL PRIMARY KEY,
    loan_id VARCHAR(100) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    document_name VARCHAR(255),
    required BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'submitted', 'verified', 'rejected'
    submission_date TIMESTAMP,
    verification_date TIMESTAMP,
    expiration_date TIMESTAMP,
    compliance_notes TEXT,
    verified_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Risk assessment results
CREATE TABLE IF NOT EXISTS risk_assessments (
    id SERIAL PRIMARY KEY,
    loan_id VARCHAR(100),
    institution_id VARCHAR(100),
    assessment_type VARCHAR(50), -- 'credit', 'market', 'operational', 'compliance'
    risk_score DECIMAL(5,2),
    risk_level VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    assessment_date TIMESTAMP DEFAULT NOW(),
    assessment_data JSONB,
    recommendations TEXT[],
    next_assessment_date TIMESTAMP,
    performed_by VARCHAR(100)
);

-- Insert sample regulatory compliance data
INSERT INTO regulatory_compliance (regulation_name, regulation_code, description, compliance_status, risk_level) VALUES
('Dodd-Frank Act', 'DODD_FRANK', 'Qualified Mortgage (QM) requirements and ability-to-repay rule', 'compliant', 'high'),
('TILA-RESPA Integrated Disclosure', 'TRID', 'Truth in Lending Act and Real Estate Settlement Procedures Act disclosure requirements', 'compliant', 'medium'),
('Equal Credit Opportunity Act', 'ECOA', 'Fair lending and anti-discrimination requirements', 'warning', 'high'),
('Bank Secrecy Act', 'BSA_AML', 'Anti-money laundering and customer due diligence requirements', 'pending', 'critical'),
('Community Reinvestment Act', 'CRA', 'Community investment and fair lending requirements', 'compliant', 'medium'),
('Home Mortgage Disclosure Act', 'HMDA', 'Mortgage lending data collection and reporting requirements', 'compliant', 'low');

-- Insert sample compliance rules
INSERT INTO compliance_rules (rule_name, rule_code, rule_description, rule_type, automation_level, check_frequency) VALUES
('QM Ability-to-Repay Verification', 'QM_ATR_CHECK', 'Verify borrower ability to repay mortgage loan', 'mandatory', 'automatic', 'real-time'),
('TRID Disclosure Timing', 'TRID_TIMING', 'Ensure proper timing of loan estimate and closing disclosure', 'mandatory', 'automatic', 'real-time'),
('Fair Lending Analysis', 'FAIR_LENDING', 'Monitor for potential disparate impact in lending decisions', 'mandatory', 'semi-automatic', 'daily'),
('CDD Customer Verification', 'CDD_VERIFY', 'Complete customer due diligence verification', 'mandatory', 'manual', 'real-time'),
('HMDA Data Collection', 'HMDA_DATA', 'Collect required HMDA reporting data points', 'mandatory', 'automatic', 'real-time');

-- Insert sample regulatory updates
INSERT INTO regulatory_updates (agency, update_title, update_type, impact_level, summary, effective_date) VALUES
('CFPB', 'Digital Lending Platform Guidance', 'guidance', 'medium', 'New guidance on digital lending platforms and consumer protection requirements', '2024-02-01'),
('Federal Reserve', 'Stress Testing Requirements Update', 'rule', 'high', 'Updated stress testing requirements for large financial institutions', '2024-03-01'),
('OCC', 'Cryptocurrency Collateral Guidelines', 'interpretation', 'low', 'Clarification on use of cryptocurrency as loan collateral', '2024-01-15'),
('FDIC', 'Enhanced CRA Examination Procedures', 'guidance', 'medium', 'Updated Community Reinvestment Act examination procedures', '2024-04-01'),
('Treasury', 'BSA/AML Requirements for Large Loans', 'rule', 'high', 'Enhanced BSA/AML requirements for institutional loans over $10M', '2024-05-01');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_compliance_bot_logs_institution ON compliance_bot_logs(institution_id);
CREATE INDEX IF NOT EXISTS idx_compliance_bot_logs_created ON compliance_bot_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_regulatory_compliance_status ON regulatory_compliance(compliance_status);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_status ON compliance_violations(status);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_severity ON compliance_violations(severity);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_agency ON regulatory_updates(agency);
CREATE INDEX IF NOT EXISTS idx_regulatory_updates_impact ON regulatory_updates(impact_level);
