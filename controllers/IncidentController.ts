import { Request, Response} from 'express';
import { Incident } from '../models/IncidentModel';
import { Util } from '../utility/utils';
import { statusCodes } from '../utility/constants';
import { IncidentStatusController } from './IncidentStatusController';
import { logger } from '../log4';
import { Processstep } from '../models/ProcessStepModel';
import { tstep } from '../Services/ProcessFlow';

export class IncidentController{
    async createIncident(req: Request,res: Response){
        
        try {            
            const incident = await Util.createData(Incident,req.body);        
            if(incident.status > 299){
                return res.json(incident)
            }
            else{                
                const result = await Util.saveData(Incident,incident.data)
                const incidentResponse = await IncidentStatusController.createIncidentStatus((result.data[0]).incidentId, 'NEW', (result.data[0]).createdBy);
                //Substatus from IncidentStatus table
                (result.data[0]).currentStatus = incidentResponse.status
                const tktStep = await tstep.createTktAppr((result.data[0]).incidentId);   
                // Remove sending TktAppr in creaton response             
                // (result.data[0]).tktStep = tktStep             
                return res.json(result)
            }                    
        } catch (error) {
            console.log(error)
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','createerr')
            return res.json([returnObj])           
        }
    }
    
    async getIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await Util.getAllData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{  
                let cnt = 0;               
                for (let inc of incident.data){

                    const incidentResponse = await IncidentStatusController.getIncidentStatus(inc.incidentId);
                    if(incidentResponse === null)
                        (incident.data[cnt]).currentStatus = incidentResponse
                    else
                        (incident.data[cnt]).currentStatus = (incidentResponse.data[0]).status
                    cnt++;
                    }
                let returnObj = await Util.returnObj(incident.data,statusCodes.success,'Incident','getall')    
                return res.json(returnObj)           
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
    
    async getIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await Util.getbyIDData(Incident,req.body);
            if(incident.status > 299){
                return res.json(incident)
            }
            else{                
                const incidentResponse = await IncidentStatusController.getIncidentStatus((incident.data[0]).incidentId);
                if(incidentResponse === null)
                    (incident.data[0]).currentStatus = incidentResponse
                else
                    (incident.data[0]).currentStatus = (incidentResponse.data[0]).status
                let returnObj = await Util.returnObj(incident.data,statusCodes.success,'Incident','getall')    
                return res.json(returnObj)           
            }                
        } catch (error) {
            console.log(error)
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
      
    async getFilteredIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await Util.getAllData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                const incidentResponse = await IncidentStatusController.getIncidentStatusByID((incident.data[0]).incidentId)
                let returnObj = await Util.returnObj(incident.data,statusCodes.success,'Incident','getall')
                returnObj.data.push(incidentResponse)
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }
    
    
    async deleteIncidentByID(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incident = await Util.deleteData(Incident,req.body);
            if(incident.status > 299){
                let returnObj = await Util.returnObj([incident.data],statusCodes.error,'Incident','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incident.data,statusCodes.error,'Incident','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','getallerr')
            return res.json(returnObj)        
        }
    }

    async updateIncident(req: Request,res: Response){
        try {            
            const incident = await Util.updateData(Incident,req.body);
            if(incident.status > 299){
                return res.json(incident)
            }
            else{
                const result = await Util.saveData(Incident,incident.data)
                // const incidentResponse = await IncidentStatusController.createIncidentStatus((result.data[0]).incidentId, 'NEW', (result.data[0]).createdBy);
                // result.data.push(incidentResponse)
                return res.json(result)
            }                    
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Incident','updateeerr')
            return res.json([returnObj])           
        }
    }
}
function or(arg0: boolean) {
    throw new Error('Function not implemented.');
}

