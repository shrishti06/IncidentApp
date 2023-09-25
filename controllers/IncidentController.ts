import { Request, Response } from "express";
import { Incident } from "../models/IncidentModel";
import { Util } from "../utility/utils";
import { statusCodes } from "../utility/constants";
import { IncidentStatusController } from "./IncidentStatusController";
import { IncidentStatusService } from "../Services/IncidentStatusService";
import {} from "../mailer/tranporter";

export class IncidentController {
  async createIncident(req: Request, res: Response) {
    try {
      const incident = await Util.createData(Incident, req.body);
      if (incident.status > 299) {
        return res.json(incident);
      } else {
        
        const result = await Util.saveData(Incident, incident.data);
        // If there is any issue while processing saving request, throw error so avoid process to go ahead
        if (result.status > 299 )
          throw new Error(result.message);

        const incidentResponse =
          await IncidentStatusController.createIncidentStatus(
            result.data[0].incidentId,
            "NEW",
            result.data[0].createdBy,
            ''
          );
          console.log(incidentResponse);
        
        result.data[0].currentStatus = incidentResponse.status;
        
        return res.json(result);
      }
    } catch (error) {
      console.log(error);
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "createerr"
      );

      return res.json([returnObj]);
    }
  }

  async getIncident(req: Request, res: Response) {
    try {
      const incident = await Util.getAllData(Incident, req.body);
      if (incident.status > 299) {
        let returnObj = await Util.returnObj(
          [incident.data],
          statusCodes.error,
          "Incident",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let cnt = 0;
        for (let inc of incident.data) {
          const incidentResponse =
            await IncidentStatusController.getIncidentStatus(inc.incidentId);
          if (incidentResponse === null)
            incident.data[cnt].currentStatus = incidentResponse;
          else
            incident.data[cnt].currentStatus = incidentResponse.data[0].status;
          cnt++;
        }
        let returnObj = await Util.returnObj(
          incident.data,
          statusCodes.success,
          "Incident",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async getIncidentByID(req: Request, res: Response) {
    try {
      const lparams = req.params
      const incident = await Util.getbyIDData(Incident, {incidentId: lparams.id});
      if (incident.status > 299) {
        return res.json(incident);
      } else {
        const incidentResponse =
          await IncidentStatusController.getIncidentStatus(
            incident.data[0].incidentId
          );
        if (incidentResponse === null){
          incident.data[0].currentStatus = incidentResponse;
          incident.data[0].nextStep      = incidentResponse;
        }
        else {incident.data[0].currentStatus = incidentResponse.data[0].status;
        incident.data[0].nextStep      = incidentResponse.data[0].nextStep;
      }
        let returnObj = await Util.returnObj(
          incident.data,
          statusCodes.success,
          "Incident",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async getFilteredIncident(req: Request, res: Response) {
    try {
      
      const incident = await Util.getAllData(Incident, req.body);
      if (incident.status > 299) {
        let returnObj = await Util.returnObj(
          [incident.data],
          statusCodes.error,
          "Incident",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        const incidentResponse =
          await IncidentStatusController.getIncidentStatusByID(
            incident.data[0].incidentId
          );
        let returnObj = await Util.returnObj(
          incident.data,
          statusCodes.success,
          "Incident",
          "getall"
        );
        returnObj.data.push(incidentResponse);
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async deleteIncidentByID(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const incident = await Util.deleteData(Incident, req.body);
      if (incident.status > 299) {
        let returnObj = await Util.returnObj(
          [incident.data],
          statusCodes.error,
          "Incident",
          "getallerr"
        );
        return res.json(returnObj);
      } else {
        let returnObj = await Util.returnObj(
          incident.data,
          statusCodes.error,
          "Incident",
          "getall"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async updateIncident(req: Request, res: Response) {
    try {
      
      const {ISOID,CISOID,MRID,currentStatus,incidentId} = req.body;      
      let result;
      //if currentStatus is not getting changed then no need to update Steps
      if(currentStatus != undefined){
        const {id ,step} = await IncidentStatusService.currentStatus(currentStatus,ISOID,CISOID,MRID)
      
        // const {id ,step} = await IncidentStatusService.currentStatus(currentStatus,ISOID,CISOID,MRID)
        if (id !== 0 && step !== ''){
          const incidentResponse = await IncidentStatusController.createIncidentStatus(incidentId, currentStatus, id,step);
          result.data.push(incidentResponse)
        }
      }
       result = await Util.saveData(Incident, req.body)
      // If there is any issue while processing saving request, throw error so avoid process to go ahead
      if (result.status > 299 )
        throw new Error(result.message);

      return res.json(result);
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Incident",
        "updateeerr"
      );
      return res.json([returnObj]);
    }
  }
}

