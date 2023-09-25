// // Import the express in typescript file
// import express from "express";
// import { ListDataMasterController } from "../controllers/ListDataMasterController";
// import {
//   validateCreateListDataMaster,
//   validateGetListDataMasterBylstMstCode,
//   validateDeleteListDataMasterById,
//   validateDeleteListDataMasterByCode,
// } from "../middleware/validations";
// var datamasterRouter = express.Router();
// const datamasterObject: ListDataMasterController =
//   new ListDataMasterController();

// datamasterRouter.post(
//   "/create",
//   validateCreateListDataMaster,
//   datamasterObject.CreateListDataMaster
// );
// datamasterRouter.get("/get", datamasterObject.getAllListDataMaster);
// datamasterRouter.get(
//   "/getByCode",
//   validateGetListDataMasterBylstMstCode,
//   datamasterObject.getMasterByCode
// );
// datamasterRouter.delete(
//   "/deleteByCode",
//   validateDeleteListDataMasterByCode,
//   datamasterObject.deleteMasterbyCode
// );
// datamasterRouter.get("/getByID", datamasterObject.getMasterById);
// datamasterRouter.delete(
//   "/delete",
//   validateDeleteListDataMasterById,
//   datamasterObject.deleteMasterbyId
// );
// export default datamasterRouter;
