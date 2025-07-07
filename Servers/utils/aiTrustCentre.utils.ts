
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
    WHERE (
      ai_trust_centre_intro.intro_visible IS DISTINCT FROM EXCLUDED.intro_visible OR
      ai_trust_centre_intro.purpose_visible IS DISTINCT FROM EXCLUDED.purpose_visible OR
      ai_trust_centre_intro.purpose_text IS DISTINCT FROM EXCLUDED.purpose_text OR
      ai_trust_centre_intro.our_statement_visible IS DISTINCT FROM EXCLUDED.our_statement_visible OR
      ai_trust_centre_intro.our_statement_text IS DISTINCT FROM EXCLUDED.our_statement_text OR
      ai_trust_centre_intro.our_mission_visible IS DISTINCT FROM EXCLUDED.our_mission_visible OR
      ai_trust_centre_intro.our_mission_text IS DISTINCT FROM EXCLUDED.our_mission_text
    )
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
    WHERE (
      ai_trust_centre_compliance_badges.badges_visible IS DISTINCT FROM EXCLUDED.badges_visible OR
      ai_trust_centre_compliance_badges.SOC2_Type_I IS DISTINCT FROM EXCLUDED.SOC2_Type_I OR
      ai_trust_centre_compliance_badges.SOC2_Type_II IS DISTINCT FROM EXCLUDED.SOC2_Type_II OR
      ai_trust_centre_compliance_badges.ISO_27001 IS DISTINCT FROM EXCLUDED.ISO_27001 OR
      ai_trust_centre_compliance_badges.ISO_42001 IS DISTINCT FROM EXCLUDED.ISO_42001 OR
      ai_trust_centre_compliance_badges.CCPA IS DISTINCT FROM EXCLUDED.CCPA OR
      ai_trust_centre_compliance_badges.GDPR IS DISTINCT FROM EXCLUDED.GDPR OR
      ai_trust_centre_compliance_badges.HIPAA IS DISTINCT FROM EXCLUDED.HIPAA OR
      ai_trust_centre_compliance_badges.EU_AI_Act IS DISTINCT FROM EXCLUDED.EU_AI_Act
    )
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
    WHERE (
      ai_trust_centre_company_info.company_info_visible IS DISTINCT FROM EXCLUDED.company_info_visible OR
      ai_trust_centre_company_info.background_visible IS DISTINCT FROM EXCLUDED.background_visible OR
      ai_trust_centre_company_info.background_text IS DISTINCT FROM EXCLUDED.background_text OR
      ai_trust_centre_company_info.core_benefit_visible IS DISTINCT FROM EXCLUDED.core_benefit_visible OR
      ai_trust_centre_company_info.core_benefit_text IS DISTINCT FROM EXCLUDED.core_benefit_text OR
      ai_trust_centre_company_info.compliance_doc_visible IS DISTINCT FROM EXCLUDED.compliance_doc_visible OR
      ai_trust_centre_company_info.compliance_doc_text IS DISTINCT FROM EXCLUDED.compliance_doc_text
    )
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
      WHERE (
        ai_trust_center_terms_and_contact.is_visible IS DISTINCT FROM EXCLUDED.is_visible OR
        ai_trust_center_terms_and_contact.has_terms_of_service IS DISTINCT FROM EXCLUDED.has_terms_of_service OR
        ai_trust_center_terms_and_contact.terms_of_service IS DISTINCT FROM EXCLUDED.terms_of_service OR
        ai_trust_center_terms_and_contact.has_privacy_policy IS DISTINCT FROM EXCLUDED.has_privacy_policy OR
        ai_trust_center_terms_and_contact.privacy_policy IS DISTINCT FROM EXCLUDED.privacy_policy OR
        ai_trust_center_terms_and_contact.has_company_email IS DISTINCT FROM EXCLUDED.has_company_email OR
        ai_trust_center_terms_and_contact.company_email IS DISTINCT FROM EXCLUDED.company_email
      )
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

export const getAITrustCentreOverviewQuery = async (organization_id: number = 1) => {
  // Get intro data
  const introResult = await sequelize.query(
    `SELECT * FROM ai_trust_centre_intro WHERE organization_id = :organization_id`,
    {
      replacements: { organization_id },
      mapToModel: true,
      model: AITrustCenterIntroModel,
    }
  );

  // Get compliance badges data
  const complianceBadgesResult = await sequelize.query(
    `SELECT * FROM ai_trust_centre_compliance_badges WHERE organization_id = :organization_id`,
    {
      replacements: { organization_id },
      mapToModel: true,
      model: AITrustCenterComplianceBadgesModel,
    }
  );

  // Get company info data
  const companyInfoResult = await sequelize.query(
    `SELECT * FROM ai_trust_centre_company_info WHERE organization_id = :organization_id`,
    {
      replacements: { organization_id },
      mapToModel: true,
      model: AITrustCentreCompanyInfoModel,
    }
  );

  // Get terms and contact data
  const termsAndContactResult = await sequelize.query(
    `SELECT * FROM ai_trust_center_terms_and_contact WHERE organization_id = :organization_id`,
    {
      replacements: { organization_id },
      mapToModel: true,
      model: AITrustCenterTermsAndContactModel,
    }
  );

  return {
    intro: introResult[0] || null,
    compliance_badges: complianceBadgesResult[0] || null,
    company_info: companyInfoResult[0] || null,
    terms_and_contact: termsAndContactResult[0] || null,
  };
};
