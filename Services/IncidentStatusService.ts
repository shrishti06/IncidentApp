import { ListDataDetailsController } from "../controllers/ListDataDetailsController";
import { EmployeeController } from "../controllers/EmployeeController";

 
export class IncidentStatusService{
    /* Create new status based on ProcessStep */
    static async createIncidentStatus(incidentId:number, status:string, changedBy:number){
        return {status,changedBy,incidentId}
    }

    static async currentStatus(status:string,ISOID:number, CISOID:number,MRID:number){
        
        if (status === 'MANAGER APPROVED' || status === 'MANAGER REJECTED'){
            /* Verify If ID matches with ListDataDetail */
            const lstDtlID = await ListDataDetailsController.getListData(MRID,'ISOID');
            if(lstDtlID == 0)
              throw Error("Not found");
            else {
                //Check if Employee also exists with that employeeID
                const emp = new EmployeeController();
                const empMSDId = await emp.getEmpByDtlID(ISOID);
                if(empMSDId == 0)
                  throw Error("Not found");
            }
            //return {id:0, step:''};
        }
        else if(status === 'ISO APPROVED' || status === 'ISO REJECTED' )
        {
            /* Verify If ID matches with ListDataDetail */
            const lstDtlID = await ListDataDetailsController.getListData(ISOID,'ISOID');
            if(lstDtlID == 0)
              throw Error("Not found");
            else {
                //Check if Employee also exists with that employeeID
                const emp = new EmployeeController();
                const empMSDId = await emp.getEmpByDtlID(ISOID);
                if(empMSDId == 0)
                  throw Error("Not found");
            }
            return {id:ISOID,step:'ISO'};
        }
        else if(status === 'CISO APPROVED' || status === 'CISO REJECTED')
        {/* Verify If ID matches with ListDataDetail */
            const lstDtlID = await ListDataDetailsController.getListData(CISOID,'ISOID');
            if(lstDtlID == 0)
            throw Error("Not found");
            else {
                //Check if Employee also exists with that employeeID
                const emp = new EmployeeController();
                const empMSDId = await emp.getEmpByDtlID(CISOID);
                if(empMSDId == 0)
                throw Error("Not found");
            }
                return {id:CISOID, step:'CISO'};
        }
        else if(status === 'MR APPROVED' || status === 'MR REJECTED')
        {
            /* Verify If ID matches with ListDataDetail */
            const lstDtlID = await ListDataDetailsController.getListData(MRID,'ISOID');
            if(lstDtlID == 0)
              throw Error("Not found");
            else {
                //Check if Employee also exists with that employeeID
                const emp = new EmployeeController();
                const empMSDId = await emp.getEmpByDtlID(MRID);
                if(empMSDId == 0)
                  throw Error("Not found");
            }
            return {id:MRID,step:'MR'};
        }   
        else if(status === 'QAG APPROVED' || status === 'QAG REJECTED')
            return {id:0,step:'INVESTIGATOR'};
        else 0;
    }
        

}