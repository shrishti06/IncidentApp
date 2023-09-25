import { Incidentstatus } from '../models/IncidentStatusModel';
import { Util } from '../utility/utils';
import { statusCodes } from '../utility/constants';
import { IncidentStatusService} from '../Services/IncidentStatusService'
import { tstep } from '../Services/ProcessFlow';

export class IncidentStatusController{
    static incidentStatus;
    /* create Incident */
    static async createIncidentStatus(incidentId:number,status:string,changedBy:number,step:string){
        try { 
            const statusObject = await IncidentStatusService.createIncidentStatus(incidentId,status,changedBy);
            this.incidentStatus = await Util.createData(Incidentstatus,statusObject);
            if(this.incidentStatus.status > 299){
                return this.incidentStatus
            }
            else{
                if (status === 'NEW'){
                    const tktStep = await tstep.createTktAppr(incidentId);
                }
                else {
                    const tktStep = await tstep.updateTktAppr(incidentId, status, changedBy,step);
                }
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
            const tktStep = await tstep.getCurrentTktStep(incidentId)
            incidentStatus.data[0].nextStep= tktStep.tktStep;
            return incidentStatus       
            }                
         catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'IncidentStatus','getallerr')
            return returnObj        
        }
    }  

    
    
}

