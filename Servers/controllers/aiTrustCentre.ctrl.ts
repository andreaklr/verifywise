import { Request, Response } from "express";
import { STATUS_CODE } from "../utils/statusCode.utils";
import { sequelize } from "../database/db";
import { createAITrustCentreOverviewQuery, getAITrustCentreOverviewQuery } from "../utils/aiTrustCentre.utils";

export async function createAITrustCentreOverview(
  req: Request,
  res: Response
): Promise<any> {
  const transaction = await sequelize.transaction();
  try {
    const overviewData = req.body;
    const result = await createAITrustCentreOverviewQuery(overviewData, transaction);

    if (result) {
      await transaction.commit();
      return res.status(201).json(
        STATUS_CODE[201]({
          message: "AI Trust Centre overview created successfully",
        })
      );
    }

    await transaction.rollback();
    return res.status(503).json(
      STATUS_CODE[503]({
        message: "Failed to create AI Trust Centre overview",
      })
    );
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json(STATUS_CODE[500]((error as Error).message));
  }
}

export async function getAITrustCentreOverview(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const organization_id = req.query.organization_id ? parseInt(req.query.organization_id as string) : 1;
    const result = await getAITrustCentreOverviewQuery(organization_id);

    if (result) {
      return res.status(200).json(
        STATUS_CODE[200]({
          message: "AI Trust Centre overview retrieved successfully",
          data: result,
        })
      );
    }

    return res.status(404).json(
      STATUS_CODE[404]({
        message: "AI Trust Centre overview not found",
      })
    );
  } catch (error) {
    return res.status(500).json(STATUS_CODE[500]((error as Error).message));
  }
}