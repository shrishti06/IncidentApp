import { Request, Response } from "express";
import { Listdatamaster } from "../models/ListDataMasterModule";
import { Listdatadetails } from "../models/ListDataDetailsModels";
import { Util } from "../utility/utils";
import { statusCodes } from "../utility/constants";

export class ListDataMasterController {
  async CreateListDataMaster(req: Request, res: Response) {
    try {
      const listdatamaster = await Util.createData(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        return res.json(listdatamaster);
      } else {
        const result = await Util.saveData(Listdatamaster, listdatamaster.data);
        return res.json(result);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "createerr"
      );
      return res.json(returnObj);
    }
  }

  async getAllListDataMaster(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const listdatamaster = await Util.getAllData(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        let returnObj = await Util.returnObj(
          [listdatamaster.data],
          statusCodes.error,
          "listdatamaster",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          listdatamaster.data,
          statusCodes.error,
          "listdatamaster",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async getMasterById(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const listdatamaster = await Util.getbyIDData(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        let returnObj = await Util.returnObj(
          [listdatamaster.data],
          statusCodes.error,
          "listdatamaster",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          listdatamaster.data,
          statusCodes.error,
          "listdatamaster",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async getMasterByCode(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const listdatamaster = await Util.getbycode(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        let returnObj = await Util.returnObj(
          [listdatamaster.data],
          statusCodes.error,
          "listdatamaster",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          listdatamaster.data,
          statusCodes.error,
          "listdatamaster",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async deleteMasterbyCode(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const listdatamaster = await Util.deleteData(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        let returnObj = await Util.returnObj(
          [listdatamaster.data],
          statusCodes.error,
          "listdatamaster",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          listdatamaster.data,
          statusCodes.error,
          "listdatamaster",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async deleteMasterbyId(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const listdatamaster = await Util.deleteData(Listdatamaster, req.body);
      if (listdatamaster.status > 299) {
        let returnObj = await Util.returnObj(
          [listdatamaster.data],
          statusCodes.error,
          "listdatamaster",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          listdatamaster.data,
          statusCodes.error,
          "listdatamaster",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "listdatamaster",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }
}
