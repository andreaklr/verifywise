"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      -- Create the ai_trust_centre_intro table
      CREATE TABLE ai_trust_centre_intro (
        id SERIAL PRIMARY KEY,
        intro_visible BOOLEAN NOT NULL DEFAULT FALSE,
        purpose_visible BOOLEAN NOT NULL DEFAULT FALSE,
        purpose_text VARCHAR(255),
        our_statement_visible BOOLEAN NOT NULL DEFAULT FALSE,
        our_statement_text VARCHAR(255),
        our_mission_visible BOOLEAN NOT NULL DEFAULT FALSE,
        our_mission_text VARCHAR(255),
        organization_id INTEGER NOT NULL REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_org_id_intro UNIQUE (organization_id)
      );

      -- Create the ai_trust_centre_compliance_badges table
      CREATE TABLE ai_trust_centre_compliance_badges (
        id SERIAL PRIMARY KEY,
        badges_visible BOOLEAN NOT NULL DEFAULT FALSE,
        soc2_type_i BOOLEAN NOT NULL DEFAULT FALSE,
        soc2_type_ii BOOLEAN NOT NULL DEFAULT FALSE,
        iso_27001 BOOLEAN NOT NULL DEFAULT FALSE,
        iso_42001 BOOLEAN NOT NULL DEFAULT FALSE,
        ccpa BOOLEAN NOT NULL DEFAULT FALSE,
        gdpr BOOLEAN NOT NULL DEFAULT FALSE,
        hipaa BOOLEAN NOT NULL DEFAULT FALSE,
        eu_ai_act BOOLEAN NOT NULL DEFAULT FALSE,
        organization_id INTEGER NOT NULL REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_org_id_badges UNIQUE (organization_id)
      );

      -- Create the ai_trust_centre_company_info table
      CREATE TABLE ai_trust_centre_company_info (
        id SERIAL PRIMARY KEY,
        company_info_visible BOOLEAN NOT NULL DEFAULT FALSE,
        background_visible BOOLEAN NOT NULL DEFAULT FALSE,
        background_text VARCHAR(255),
        core_benefit_visible BOOLEAN NOT NULL DEFAULT FALSE,
        core_benefit_text VARCHAR(255),
        compliance_doc_visible BOOLEAN NOT NULL DEFAULT FALSE,
        compliance_doc_text VARCHAR(255),
        organization_id INTEGER NOT NULL REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_org_id_company_info UNIQUE (organization_id)
      );

      -- Create the ai_trust_center_terms_and_contact table
      CREATE TABLE ai_trust_center_terms_and_contact (
        id SERIAL PRIMARY KEY,
        is_visible BOOLEAN NOT NULL DEFAULT FALSE,
        has_terms_of_service BOOLEAN NOT NULL DEFAULT FALSE,
        terms_of_service VARCHAR(255),
        has_privacy_policy BOOLEAN NOT NULL DEFAULT FALSE,
        privacy_policy VARCHAR(255),
        has_company_email BOOLEAN NOT NULL DEFAULT FALSE,
        company_email VARCHAR(255),
        organization_id INTEGER NOT NULL REFERENCES organizations(id) ON UPDATE CASCADE ON DELETE CASCADE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_org_id_terms_and_contact UNIQUE (organization_id)
      );

      -- Create the trigger function to auto-update updated_at for all three tables
      CREATE OR REPLACE FUNCTION update_updated_at_column_ai_trust()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      -- Attach the trigger to ai_trust_centre_intro
      CREATE TRIGGER set_updated_at_ai_trust_centre_intro
      BEFORE UPDATE ON ai_trust_centre_intro
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column_ai_trust();

      -- Attach the trigger to ai_trust_centre_compliance_badges
      CREATE TRIGGER set_updated_at_ai_trust_centre_compliance_badges
      BEFORE UPDATE ON ai_trust_centre_compliance_badges
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column_ai_trust();

      -- Attach the trigger to ai_trust_centre_company_info
      CREATE TRIGGER set_updated_at_ai_trust_centre_company_info
      BEFORE UPDATE ON ai_trust_centre_company_info
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column_ai_trust();

      -- Attach the trigger to ai_trust_center_terms_and_contact
      CREATE TRIGGER set_updated_at_ai_trust_center_terms_and_contact
      BEFORE UPDATE ON ai_trust_center_terms_and_contact
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column_ai_trust();
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS set_updated_at_ai_trust_centre_intro ON ai_trust_centre_intro;
      DROP TRIGGER IF EXISTS set_updated_at_ai_trust_centre_compliance_badges ON ai_trust_centre_compliance_badges;
      DROP TRIGGER IF EXISTS set_updated_at_ai_trust_centre_company_info ON ai_trust_centre_company_info;
      DROP TRIGGER IF EXISTS set_updated_at_ai_trust_center_terms_and_contact ON ai_trust_center_terms_and_contact;
      DROP FUNCTION IF EXISTS update_updated_at_column_ai_trust;
      DROP TABLE IF EXISTS ai_trust_centre_company_info;
      DROP TABLE IF EXISTS ai_trust_centre_compliance_badges;
      DROP TABLE IF EXISTS ai_trust_centre_intro;
      DROP TABLE IF EXISTS ai_trust_center_terms_and_contact;
    `);
  }
};
