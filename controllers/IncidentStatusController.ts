import { Incidentstatus } from '../models/IncidentStatusModel';
import { Util } from '../utility/utils';
import { statusCodes } from '../utility/constants';
import { IncidentStatusService} from '../Services/IncidentStatusService'



export class IncidentStatusController{
    static incidentStatus;
    static async createIncidentStatus(incidentId:number,status:string,changedBy:number){
        try { 
            const statusObject = await IncidentStatusService.createIncidentStatus(incidentId,status,changedBy);
            this.incidentStatus = await Util.createData(Incidentstatus,statusObject);
            if(this.incidentStatus.status > 299){
                return this.incidentStatus
            }
            else{
                const result  = await Util.saveData(Incidentstatus,IncidentStatusController.incidentStatus.data[0])
                return result.data
            }                    
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','createerr')
            return returnObj         
        }
    }
      
    static async getIncidentStatusByID(incidentId){
        try {
            const incidentStatus = await Util.getbyIDData(Incidentstatus,incidentId);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'IncidentStatus','getallerr')
                return returnObj
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.success,'IncidentStatus','getall')
                console.log(returnObj.data)
                return returnObj.data        
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return returnObj        
        }
    }

    static async getIncidentStatus(incidentId){
        try {
            const incidentStatus = await Util.getLatestStatus(Incidentstatus,{incidentId});
                console.log(incidentStatus)
                return incidentStatus       
            }                
         catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return returnObj        
        }
    }
      
    /*async getFilteredIncident(req: Request,res: Response){
        try {
            // const user = await appDataSource.getRepository(Employee).create(req.body)
            const incidentStatus = await Util.getAllData(Incidentstatus,req.body);
            if(incidentStatus.status > 299){
                let returnObj = await Util.returnObj([incidentStatus.data],statusCodes.error,'IncidentStatus','getallerr')
                return res.json(returnObj)
            }
            else{
                let returnObj = await Util.returnObj(incidentStatus.data,statusCodes.error,'IncidentStatus','getall')
                return res.json(returnObj)            
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return res.json(returnObj)        
        }
    }*/    
    
}

