
import { AITrustCenterIntroModel } from "../domain.layer/models/aiTrustCentreIntro/aiTrustCentreIntro.model";
import { AITrustCenterComplianceBadgesModel } from "../domain.layer/models/aiTrustCentreBadges/aiTrustCentreBadges.model";
import {AITrustCentreCompanyInfoModel} from "../domain.layer/models/aiTrustCentreCompanyInfo/aiTrustCentreCompanyInfo.model"
import { AITrustCenterTermsAndContactModel } from "../domain.layer/models/aiTrustCenterTermsAndContact/aiTrustCenterTermsAndContact.model";
import { sequelize } from "../database/db";
import { Transaction } from "sequelize";

export const createAITrustCentreOverviewQuery = async (
  overview: {
    intro: Partial<AITrustCenterIntroModel>,
    compliance_badges: Partial<AITrustCenterComplianceBadgesModel>,
    company_info: Partial<AITrustCentreCompanyInfoModel>,
    terms_and_contact?: Partial<AITrustCenterTermsAndContactModel>
  },
  transaction: Transaction
) => {
  // Use organization_id = 1 for all inserts
  const organization_id = 1;

  // Insert into ai_trust_centre_intro
  const [intro] = await sequelize.query(
    `INSERT INTO ai_trust_centre_intro (
      intro_visible, purpose_visible, purpose_text,
      our_statement_visible, our_statement_text,
      our_mission_visible, our_mission_text, organization_id
    ) VALUES (
      :intro_visible, :purpose_visible, :purpose_text,
      :our_statement_visible, :our_statement_text,
      :our_mission_visible, :our_mission_text, :organization_id
    ) ON CONFLICT (organization_id) DO UPDATE SET
      intro_visible = EXCLUDED.intro_visible,
      purpose_visible = EXCLUDED.purpose_visible,
      purpose_text = EXCLUDED.purpose_text,
      our_statement_visible = EXCLUDED.our_statement_visible,
      our_statement_text = EXCLUDED.our_statement_text,
      our_mission_visible = EXCLUDED.our_mission_visible,
      our_mission_text = EXCLUDED.our_mission_text,
      updated_at = NOW()
    RETURNING *`,
    {
      replacements: {
        ...overview.intro,
        organization_id,
      },
      mapToModel: true,
      model: AITrustCenterIntroModel,
      transaction,
    }
  );

  // Insert into ai_trust_centre_compliance_badges
  const [compliance_badges] = await sequelize.query(
    `INSERT INTO ai_trust_centre_compliance_badges (
      badges_visible, SOC2_Type_I, SOC2_Type_II, ISO_27001, ISO_42001,
      CCPA, GDPR, HIPAA, EU_AI_Act, organization_id
    ) VALUES (
      :badges_visible, :SOC2_Type_I, :SOC2_Type_II, :ISO_27001, :ISO_42001,
      :CCPA, :GDPR, :HIPAA, :EU_AI_Act, :organization_id
    ) ON CONFLICT (organization_id) DO UPDATE SET
      badges_visible = EXCLUDED.badges_visible,
      SOC2_Type_I = EXCLUDED.SOC2_Type_I,
      SOC2_Type_II = EXCLUDED.SOC2_Type_II,
      ISO_27001 = EXCLUDED.ISO_27001,
      ISO_42001 = EXCLUDED.ISO_42001,
      CCPA = EXCLUDED.CCPA,
      GDPR = EXCLUDED.GDPR,
      HIPAA = EXCLUDED.HIPAA,
      EU_AI_Act = EXCLUDED.EU_AI_Act,
      updated_at = NOW()
    RETURNING *`,
    {
      replacements: {
        ...overview.compliance_badges,
        organization_id,
      },
      mapToModel: true,
      model: AITrustCenterComplianceBadgesModel,
      transaction,
    }
  );

  // Insert into ai_trust_centre_company_info
  const [company_info] = await sequelize.query(
    `INSERT INTO ai_trust_centre_company_info (
      company_info_visible, background_visible, background_text,
      core_benefit_visible, core_benefit_text,
      compliance_doc_visible, compliance_doc_text, organization_id
    ) VALUES (
      :company_info_visible, :background_visible, :background_text,
      :core_benefit_visible, :core_benefit_text,
      :compliance_doc_visible, :compliance_doc_text, :organization_id
    ) ON CONFLICT (organization_id) DO UPDATE SET
      company_info_visible = EXCLUDED.company_info_visible,
      background_visible = EXCLUDED.background_visible,
      background_text = EXCLUDED.background_text,
      core_benefit_visible = EXCLUDED.core_benefit_visible,
      core_benefit_text = EXCLUDED.core_benefit_text,
      compliance_doc_visible = EXCLUDED.compliance_doc_visible,
      compliance_doc_text = EXCLUDED.compliance_doc_text,
      updated_at = NOW()
    RETURNING *`,
    {
      replacements: {
        ...overview.company_info,
        organization_id,
      },
      mapToModel: true,
      model: AITrustCentreCompanyInfoModel,
      transaction,
    }
  );

  // Insert into ai_trust_center_terms_and_contact
    const [terms_and_contact] = await sequelize.query(
      `INSERT INTO ai_trust_center_terms_and_contact (
        is_visible, has_terms_of_service, terms_of_service,
        has_privacy_policy, privacy_policy,
        has_company_email, company_email, organization_id
      ) VALUES (
        :is_visible, :has_terms_of_service, :terms_of_service,
        :has_privacy_policy, :privacy_policy,
        :has_company_email, :company_email, :organization_id
      ) ON CONFLICT (organization_id) DO UPDATE SET
        is_visible = EXCLUDED.is_visible,
        has_terms_of_service = EXCLUDED.has_terms_of_service,
        terms_of_service = EXCLUDED.terms_of_service,
        has_privacy_policy = EXCLUDED.has_privacy_policy,
        privacy_policy = EXCLUDED.privacy_policy,
        has_company_email = EXCLUDED.has_company_email,
        company_email = EXCLUDED.company_email,
        updated_at = NOW()
      RETURNING *`,
      {
        replacements: {
          ...overview.terms_and_contact,
          organization_id,
        },
        mapToModel: true,
        model: AITrustCenterTermsAndContactModel,
        transaction,
      }
    );
  

  return {
    intro,
    compliance_badges,
    company_info,
    terms_and_contact,
  };
};
