import { Request, Response, NextFunction } from "express";
import Joi, { options } from "joi";
import {
  statusCodes,
  messages,
  empMessages,
  incMessages,
  datamasterMessages,
  datadetailsMessages,
} from "../utility/constants";

async function validateCreateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    name: Joi.string().required().label(empMessages.empNameRequired),
    emailID: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
      .required()
      .label(empMessages.empEmailIDRequired),
    department: Joi.string()
      .required()
      .label(empMessages.empDepartmentRequired),
    empMSDId: Joi.string().required().label(empMessages.empProjectRequired),
    manager: Joi.string().required().label(empMessages.empManagerIDRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateDeleteEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    empId: Joi.number().required().label(empMessages.empEmpIDRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}
async function validateCreateIncident(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    empId: Joi.number().required().label(incMessages.incOwnerRequired),
    createdBy: Joi.number().required().label(incMessages.incCreatedByRequired),
    description: Joi.string().required().label(incMessages.incDescRequired),
    impact: Joi.string().optional(),
    ISOID: Joi.string().optional(),
    CISOID: Joi.string().optional(),
    MRID: Joi.string().optional(),
    investigatorID: Joi.string().optional(),
    impactPostSeverity: Joi.string().optional(),
    reportDateTime: Joi.string().optional(),
    correction: Joi.string().optional(),
    correctiveAction: Joi.string().optional(),
    rootCause: Joi.string().optional(),
    reviewDate: Joi.string().optional(),
    correctionDate: Joi.string().optional(),
    mrRemarks: Joi.string().optional(),
    mrDate: Joi.string().optional(),
    isDisplinaryReq: Joi.boolean().optional(),
    isoRemark: Joi.string().optional(),
    isoRemarkDate: Joi.string().optional(),
    cisoRemark: Joi.string().optional(),
    incidentType: Joi.string().optional(),
    status: Joi.string().optional(),
    closeDate: Joi.string().optional(),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateGetIncidentByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    incidentId: Joi.number()
      .required()
      .label(incMessages.incIncidentIDRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateCreateListDataMaster(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    // lstMstID: Joi.number().required().label(datamasterMessages.datamasterlstMstIDRequired),
    lstMstCode: Joi.string()
      .required()
      .label(datamasterMessages.datamasterlstMstCodeRequired),
    lstMstDesc: Joi.string()
      .required()
      .label(datamasterMessages.datamasterlstMstDescRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateGetListDataMasterBylstMstCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    lstMstCode: Joi.string()
      .required()
      .label(datamasterMessages.datamasterlstMstCodeRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateDeleteListDataMasterById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    lstMstID: Joi.number()
      .required()
      .label(datamasterMessages.datamasterlstMstIDRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateDeleteListDataMasterByCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    lstMstCode: Joi.string()
      .required()
      .label(datamasterMessages.datamasterlstMstCodeRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateCreateListDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    //lstDtlID: Joi.number().required().label(datadetailsMessages.datadetailslstDtlIDRequired),
    lstDtlCode: Joi.string()
      .required()
      .label(datadetailsMessages.datadetailslstDtlCodeRequired),
    lstDtlDesc: Joi.string()
      .required()
      .label(datadetailsMessages.datadetailslstDtlDescRequired),
    lstMstID: Joi.number()
      .required()
      .label(datadetailsMessages.datadetailslstMstIDRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateGetListdatadetailsBylstDtlCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    lstDtlCode: Joi.string()
      .required()
      .label(datadetailsMessages.datadetailslstDtlCodeRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

async function validateDeleteListdatadetailsBylstDtlCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var ldata = req.body;
  const lJoiSchema = Joi.object({
    lstDtlCode: Joi.string()
      .required()
      .label(datadetailsMessages.datadetailslstDtlCodeRequired),
  }).options({ abortEarly: false });
  let lresponse = lJoiSchema.validate(ldata, { abortEarly: false });
  if (lresponse.error == undefined || lresponse.error == null) {
    next();
  } else {
    return res.json({
      status: statusCodes.error,
      message: messages.requiredFields,
      data: lresponse.error.details.map((error) => {
        return error.context.label;
      }),
    });
  }
}

export {
  validateCreateEmployee,
  validateDeleteEmployee,
  validateCreateIncident,
  validateGetIncidentByID,
  validateCreateListDataMaster,
  validateDeleteListDataMasterById,
  validateDeleteListDataMasterByCode,
  validateGetListDataMasterBylstMstCode,
  validateCreateListDetails,
  validateGetListdatadetailsBylstDtlCode,
  validateDeleteListdatadetailsBylstDtlCode,
};
