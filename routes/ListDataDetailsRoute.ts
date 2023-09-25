// // Import the express in typescript file
// import express from "express";
// import { ListDataDetailsController } from "../controllers/ListDataDetailsController";
// import {
//   validateCreateListDetails,
//   validateGetListdatadetailsBylstDtlCode,
//   validateDeleteListdatadetailsBylstDtlCode,
// } from "../middleware/validations";
// var datadetailsRouter = express.Router();
// const datadetailsObject: ListDataDetailsController =
//   new ListDataDetailsController();

// datadetailsRouter.post(
//   "/create",
//   validateCreateListDetails,
//   datadetailsObject.CreateListDataDetails
// );
// datadetailsRouter.get("/get", datadetailsObject.getAllListDataDetails);
// datadetailsRouter.get(
//   "/getBylstDtlcode",
//   validateGetListdatadetailsBylstDtlCode,
//   datadetailsObject.getDetailsBylstDtlCode
// );
// datadetailsRouter.delete(
//   "/deleteBylstDtlcode",
//   validateDeleteListdatadetailsBylstDtlCode,
//   datadetailsObject.deleteDetailsBylstDtlCode
// );
// datadetailsRouter.get("/getByMasterID", datadetailsObject.getDetailsByMasterId);
// datadetailsRouter.delete(
//   "/deleteByMstId",
//   datadetailsObject.deleteDetailbyMstId
// );

// export default datadetailsRouter;
