-- Loan Compliance Bot Database Schema
-- Creates tables for compliance monitoring, rules, and audit trails

-- Compliance Rules Table
CREATE TABLE IF NOT EXISTS compliance_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    severity VARCHAR(20) CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    loan_types TEXT[], -- Array of loan types this rule applies to
    rule_logic JSONB, -- Stores the rule logic/conditions
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by VARCHAR(255),
    updated_by VARCHAR(255)
);

-- Compliance Scans Table
CREATE TABLE IF NOT EXISTS compliance_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id VARCHAR(100) UNIQUE NOT NULL,
    scan_type VARCHAR(50) DEFAULT 'full', -- full, partial, targeted
    status VARCHAR(20) CHECK (status IN ('pending', 'running', 'completed', 'failed')),
    total_loans INTEGER DEFAULT 0,
    scanned_loans INTEGER DEFAULT 0,
    average_score DECIMAL(5,2),
    total_violations INTEGER DEFAULT 0,
    critical_violations INTEGER DEFAULT 0,
    bond_compliance_rate DECIMAL(5,2),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    scan_duration_seconds INTEGER,
    initiated_by VARCHAR(255),
    scan_parameters JSONB
);

-- Loan Compliance Results Table
CREATE TABLE IF NOT EXISTS loan_compliance_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id VARCHAR(100) REFERENCES compliance_scans(scan_id),
    loan_id VARCHAR(100) NOT NULL,
    loan_type VARCHAR(20) CHECK (loan_type IN ('FHA', 'VA', 'USDA', 'SBA')),
    overall_score DECIMAL(5,2) NOT NULL,
    bond_structure_valid BOOLEAN DEFAULT false,
    guarantee_period_correct BOOLEAN DEFAULT false,
    dax_mirror_active BOOLEAN DEFAULT false,
    compliance_status VARCHAR(20) CHECK (compliance_status IN ('compliant', 'non_compliant', 'warning')),
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    raw_results JSONB -- Stores detailed compliance check results
);

-- Compliance Violations Table
CREATE TABLE IF NOT EXISTS compliance_violations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID REFERENCES loan_compliance_results(id),
    loan_id VARCHAR(100) NOT NULL,
    rule_id VARCHAR(100) REFERENCES compliance_rules(rule_id),
    severity VARCHAR(20) CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    violation_message TEXT NOT NULL,
    recommendation TEXT,
    status VARCHAR(20) CHECK (status IN ('active', 'resolved', 'investigating', 'false_positive')) DEFAULT 'active',
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by VARCHAR(255),
    resolution_notes TEXT
);

-- Bond Structures Table
CREATE TABLE IF NOT EXISTS bond_structures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    loan_type VARCHAR(20) CHECK (loan_type IN ('FHA', 'VA', 'USDA', 'SBA')),
    bond_type VARCHAR(50) NOT NULL, -- e.g., "FHA 30-Year", "VA 50-Year"
    guarantee_period_years INTEGER NOT NULL,
    government_backing BOOLEAN DEFAULT true,
    dax_mirror_enabled BOOLEAN DEFAULT false,
    structure_config JSONB, -- Detailed bond structure configuration
    effective_date DATE NOT NULL,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compliance Alerts Table
CREATE TABLE IF NOT EXISTS compliance_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_id VARCHAR(100) UNIQUE NOT NULL,
    loan_id VARCHAR(100) NOT NULL,
    violation_id UUID REFERENCES compliance_violations(id),
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('critical', 'high', 'medium', 'low')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    acknowledged_by VARCHAR(255),
    resolved_by VARCHAR(255),
    metadata JSONB -- Additional alert metadata
);

-- Compliance Audit Trail Table
CREATE TABLE IF NOT EXISTS compliance_audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL, -- 'loan', 'rule', 'scan', 'alert'
    entity_id VARCHAR(100) NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'created', 'updated', 'deleted', 'scanned', 'resolved'
    old_values JSONB,
    new_values JSONB,
    performed_by VARCHAR(255) NOT NULL,
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    notes TEXT
);

-- Compliance Metrics Table (for performance tracking)
CREATE TABLE IF NOT EXISTS compliance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_date DATE NOT NULL,
    total_loans INTEGER DEFAULT 0,
    compliant_loans INTEGER DEFAULT 0,
    compliance_rate DECIMAL(5,2),
    total_violations INTEGER DEFAULT 0,
    critical_violations INTEGER DEFAULT 0,
    avg_processing_time_seconds DECIMAL(10,2),
    false_positive_rate DECIMAL(5,2),
    accuracy_rate DECIMAL(5,2),
    cost_savings_usd DECIMAL(15,2),
    risk_mitigation_usd DECIMAL(15,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_compliance_scans_status ON compliance_scans(status);
CREATE INDEX IF NOT EXISTS idx_compliance_scans_started_at ON compliance_scans(started_at);
CREATE INDEX IF NOT EXISTS idx_loan_compliance_results_loan_id ON loan_compliance_results(loan_id);
CREATE INDEX IF NOT EXISTS idx_loan_compliance_results_scan_id ON loan_compliance_results(scan_id);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_loan_id ON compliance_violations(loan_id);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_status ON compliance_violations(status);
CREATE INDEX IF NOT EXISTS idx_compliance_violations_severity ON compliance_violations(severity);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_status ON compliance_alerts(status);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_severity ON compliance_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_compliance_alerts_loan_id ON compliance_alerts(loan_id);
CREATE INDEX IF NOT EXISTS idx_compliance_audit_trail_entity ON compliance_audit_trail(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_compliance_audit_trail_performed_at ON compliance_audit_trail(performed_at);
CREATE INDEX IF NOT EXISTS idx_compliance_metrics_date ON compliance_metrics(metric_date);

-- Insert default compliance rules
INSERT INTO compliance_rules (rule_id, name, description, severity, loan_types, rule_logic, enabled) VALUES
('FHA_BOND_STRUCTURE', 'FHA 30-Year Bond Structure', 'Verify FHA loans have proper 30-year government guarantee structure', 'critical', ARRAY['FHA'], '{"guarantee_period": 30, "government_backing": true}', true),
('VA_BOND_STRUCTURE', 'VA 50-Year Bond Structure', 'Verify VA loans have proper 50-year government guarantee structure', 'critical', ARRAY['VA'], '{"guarantee_period": 50, "government_backing": true}', true),
('USDA_BOND_STRUCTURE', 'USDA 35-Year Bond Structure', 'Verify USDA loans have proper 35-year government guarantee structure', 'critical', ARRAY['USDA'], '{"guarantee_period": 35, "government_backing": true}', true),
('SBA_BOND_STRUCTURE', 'SBA 25-Year Bond Structure', 'Verify SBA loans have proper 25-year government guarantee structure', 'critical', ARRAY['SBA'], '{"guarantee_period": 25, "government_backing": true}', true),
('DAX_MIRROR_COMPLIANCE', 'DAX Corporate Bond Mirroring', 'Ensure loan structure mirrors corporate bond requirements for DAX trading', 'high', ARRAY['FHA', 'VA', 'USDA', 'SBA'], '{"dax_mirror_required": true}', true),
('DOCUMENTATION_COMPLETE', 'Required Documentation', 'Verify all required documents are present and valid', 'medium', ARRAY['FHA', 'VA', 'USDA', 'SBA'], '{"required_docs_check": true}', true),
('BORROWER_ELIGIBILITY', 'Borrower Eligibility', 'Verify borrower meets program-specific eligibility requirements', 'high', ARRAY['FHA', 'VA', 'USDA', 'SBA'], '{"eligibility_check": true}', true)
ON CONFLICT (rule_id) DO NOTHING;

-- Insert default bond structures
INSERT INTO bond_structures (loan_type, bond_type, guarantee_period_years, government_backing, dax_mirror_enabled, effective_date) VALUES
('FHA', 'FHA 30-Year Government Bond', 30, true, true, '2024-01-01'),
('VA', 'VA 50-Year Government Bond', 50, true, true, '2024-01-01'),
('USDA', 'USDA 35-Year Government Bond', 35, true, true, '2024-01-01'),
('SBA', 'SBA 25-Year Government Bond', 25, true, true, '2024-01-01')
ON CONFLICT DO NOTHING;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_compliance_rules_updated_at BEFORE UPDATE ON compliance_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bond_structures_updated_at BEFORE UPDATE ON bond_structures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO compliance_bot_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO compliance_bot_user;
