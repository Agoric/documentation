-- Create compliance tables for loan compliance bot
-- Supports 50-year government bond structures with DAX mirroring

-- Compliance rules table
CREATE TABLE IF NOT EXISTS compliance_rules (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    rule_name VARCHAR(255) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    loan_types JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT NOT NULL,
    regulation VARCHAR(255) NOT NULL,
    auto_check BOOLEAN DEFAULT TRUE,
    remediation TEXT NOT NULL,
    bond_structure_rule BOOLEAN DEFAULT FALSE,
    dax_mirror_rule BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance alerts table
CREATE TABLE IF NOT EXISTS compliance_alerts (
    id VARCHAR(50) PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    rule_id VARCHAR(50) NOT NULL REFERENCES compliance_rules(id),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'pending', 'dismissed')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    assigned_to VARCHAR(255),
    resolution_notes TEXT,
    bond_structure_impact BOOLEAN DEFAULT FALSE,
    dax_compliance_impact BOOLEAN DEFAULT FALSE
);

-- Compliance scans table
CREATE TABLE IF NOT EXISTS compliance_scans (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    scan_type VARCHAR(50) NOT NULL DEFAULT 'automated',
    loan_type VARCHAR(20) NOT NULL,
    overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    bond_compliance_score INTEGER NOT NULL CHECK (bond_compliance_score >= 0 AND bond_compliance_score <= 100),
    dax_mirror_score INTEGER NOT NULL CHECK (dax_mirror_score >= 0 AND dax_mirror_score <= 100),
    alerts_count INTEGER DEFAULT 0,
    critical_alerts_count INTEGER DEFAULT 0,
    scan_duration_ms INTEGER,
    scan_results JSONB,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    scanned_by VARCHAR(255) DEFAULT 'compliance_bot'
);

-- Bond structure compliance table
CREATE TABLE IF NOT EXISTS bond_structure_compliance (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    loan_type VARCHAR(20) NOT NULL,
    bond_term INTEGER NOT NULL,
    guarantee_term INTEGER NOT NULL,
    dax_mirror_type VARCHAR(50) NOT NULL,
    term_compliance BOOLEAN DEFAULT FALSE,
    guarantee_compliance BOOLEAN DEFAULT FALSE,
    dax_mirror_compliance BOOLEAN DEFAULT FALSE,
    risk_adjustment_compliance BOOLEAN DEFAULT FALSE,
    secondary_market_compliance BOOLEAN DEFAULT FALSE,
    government_backing_verified BOOLEAN DEFAULT FALSE,
    corporate_bond_structure_verified BOOLEAN DEFAULT FALSE,
    compliance_score INTEGER NOT NULL CHECK (compliance_score >= 0 AND compliance_score <= 100),
    last_verified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verification_notes TEXT
);

-- DAX mirroring compliance table
CREATE TABLE IF NOT EXISTS dax_mirroring_compliance (
    id SERIAL PRIMARY KEY,
    application_id VARCHAR(50) NOT NULL,
    loan_type VARCHAR(20) NOT NULL,
    dax_mirror_type VARCHAR(50) NOT NULL,
    base_rate DECIMAL(5,3) NOT NULL,
    dax_spread DECIMAL(5,3) NOT NULL,
    risk_adjustment DECIMAL(5,3) NOT NULL,
    government_discount DECIMAL(5,3) NOT NULL,
    final_rate DECIMAL(5,3) NOT NULL,
    spread_compliance BOOLEAN DEFAULT FALSE,
    pricing_compliance BOOLEAN DEFAULT FALSE,
    liquidity_compliance BOOLEAN DEFAULT FALSE,
    yield_curve_compliance BOOLEAN DEFAULT FALSE,
    covenant_compliance BOOLEAN DEFAULT FALSE,
    compliance_score INTEGER NOT NULL CHECK (compliance_score >= 0 AND compliance_score <= 100),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    market_data_source VARCHAR(100),
    validation_notes TEXT
);

-- Institutional lender settings table
CREATE TABLE IF NOT EXISTS institutional_lender_settings (
    id SERIAL PRIMARY KEY,
    lender_id VARCHAR(50) NOT NULL UNIQUE,
    lender_name VARCHAR(255) NOT NULL,
    compliance_threshold INTEGER DEFAULT 85 CHECK (compliance_threshold >= 0 AND compliance_threshold <= 100),
    auto_scan_enabled BOOLEAN DEFAULT TRUE,
    alert_email_notifications BOOLEAN DEFAULT TRUE,
    webhook_url VARCHAR(500),
    custom_rules JSONB DEFAULT '[]'::jsonb,
    bond_structure_requirements JSONB DEFAULT '{}'::jsonb,
    dax_mirror_preferences JSONB DEFAULT '{}'::jsonb,
    risk_tolerance_settings JSONB DEFAULT '{}'::jsonb,
    reporting_frequency VARCHAR(20) DEFAULT 'daily' CHECK (reporting_frequency IN ('real-time', 'hourly', 'daily', 'weekly')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default compliance rules for 50-year government bonds
INSERT INTO compliance_rules (
    id, category, rule_name, severity, loan_types, description, regulation, auto_check, remediation, bond_structure_rule, dax_mirror_rule
) VALUES 
-- FHA Rules
(
    'FHA-001', 'Eligibility', 'Credit Score Minimum', 'critical', '["fha"]'::jsonb,
    'Borrower must have minimum credit score of 580 for 3.5% down payment',
    'FHA Handbook 4000.1', TRUE,
    'Require higher down payment or decline application', FALSE, FALSE
),
(
    'FHA-002', 'Bond Structure', 'FHA 50-Year Bond Compliance', 'high', '["fha"]'::jsonb,
    'FHA 50-year bond must maintain 30-year government guarantee structure',
    'FHA Handbook 4000.1 (Modified for Bond Structure)', TRUE,
    'Verify 30-year guarantee period and DAX Secondary mirror compliance', TRUE, TRUE
),

-- VA Rules
(
    'VA-001', 'Eligibility', 'Military Service Verification', 'critical', '["va"]'::jsonb,
    'Valid Certificate of Eligibility required for all VA loans',
    '38 CFR 36.4302', TRUE,
    'Obtain COE from VA or veteran', FALSE, FALSE
),
(
    'VA-002', 'Bond Structure', 'VA 50-Year Full Guarantee', 'high', '["va"]'::jsonb,
    'VA 50-year bond must maintain full government guarantee throughout entire term',
    'VA Circular 26-20-16 (Modified for Bond Structure)', TRUE,
    'Verify full 50-year guarantee and DAX Premium mirror compliance', TRUE, TRUE
),

-- USDA Rules
(
    'USDA-001', 'Property', 'Rural Area Eligibility', 'critical', '["usda"]'::jsonb,
    'Property must be located in USDA eligible rural area',
    '7 CFR 3550.53', TRUE,
    'Verify property location with USDA eligibility map', FALSE, FALSE
),
(
    'USDA-002', 'Bond Structure', 'USDA 35-Year Rural Bond Guarantee', 'medium', '["usda"]'::jsonb,
    'USDA 50-year rural bond includes 35-year government guarantee period',
    '7 CFR 3550 (Modified for Bond Structure)', TRUE,
    'Confirm 35-year guarantee period and agricultural DAX mirror pricing', TRUE, TRUE
),

-- SBA Rules
(
    'SBA-001', 'Business', 'Business Use Requirement', 'critical', '["sba"]'::jsonb,
    'Loan proceeds must be used for eligible business purposes',
    '13 CFR 120.111', FALSE,
    'Review business plan and use of funds documentation', FALSE, FALSE
),
(
    'SBA-002', 'Bond Structure', 'SBA 25-Year Business Bond Guarantee', 'high', '["sba"]'::jsonb,
    'SBA 50-year business bond includes 25-year government guarantee with corporate structure',
    '13 CFR 120 (Modified for Corporate Bond Structure)', TRUE,
    'Validate 25-year guarantee period and corporate DAX mirror compliance', TRUE, TRUE
),

-- Universal Rules
(
    'DAX-001', 'Bond Structure', 'DAX Secondary Market Compliance', 'high', '["fha", "va", "usda", "sba"]'::jsonb,
    'All 50-year government bonds must mirror appropriate DAX corporate bond structures',
    'Internal Snapifi Bond Policy 2024-001', TRUE,
    'Verify DAX mirror type, spread, and pricing compliance', TRUE, TRUE
),
(
    'GEN-001', 'Documentation', 'Anti-Money Laundering', 'critical', '["fha", "va", "usda", "sba"]'::jsonb,
    'Complete AML verification required for all loan applications',
    '31 CFR 1020.220', TRUE,
    'Complete enhanced due diligence and SAR filing if necessary', FALSE, FALSE
),
(
    'BOND-001', 'Bond Structure', '50-Year Term Compliance', 'high', '["fha", "va", "usda", "sba"]'::jsonb,
    'All government bonds must be structured with 50-year amortization',
    'Internal Snapifi Bond Policy 2024-001', TRUE,
    'Verify bond term length and amortization schedule', TRUE, FALSE
),
(
    'BOND-002', 'Bond Structure', 'Government Guarantee Verification', 'critical', '["fha", "va", "usda", "sba"]'::jsonb,
    'Government guarantee period must be properly documented and verified',
    'Multiple Government Regulations (Program Specific)', TRUE,
    'Verify guarantee terms with appropriate government agency', TRUE, FALSE
)

ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category,
    rule_name = EXCLUDED.rule_name,
    severity = EXCLUDED.severity,
    loan_types = EXCLUDED.loan_types,
    description = EXCLUDED.description,
    regulation = EXCLUDED.regulation,
    auto_check = EXCLUDED.auto_check,
    remediation = EXCLUDED.remediation,
    bond_structure_rule = EXCLUDED.bond_structure_rule,
    dax_mirror_rule = EXCLUDED.dax_mirror_rule,
    updated_at = NOW();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_application ON compliance_alerts(application_id);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_status ON compliance_alerts(status);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_severity ON compliance_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_application ON compliance_scans(application_id);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_date ON compliance_scans(scanned_at);
CREATE INDEX IF NOT EXISTS idx_bond_structure_compliance_application ON bond_structure_compliance(application_id);
CREATE INDEX IF NOT EXISTS idx_dax_mirroring_compliance_application ON dax_mirroring_compliance(application_id);
CREATE INDEX IF NOT EXISTS idx_compliance_rules_loan_types ON compliance_rules USING GIN(loan_types);
CREATE INDEX IF NOT EXISTS idx_compliance_rules_category ON compliance_rules(category);

-- Success message
SELECT 'Loan Compliance Bot Database Setup Complete!' as message,
       'Tables created: compliance_rules, compliance_alerts, compliance_scans, bond_structure_compliance, dax_mirroring_compliance, institutional_lender_settings' as tables_created,
       'Compliance rules added: 12 rules covering FHA, VA, USDA, SBA, and universal bond requirements' as rules_added,
       'Ready for institutional deployment' as status;
