import { appDataSource } from '../database/database';
import { logger } from '../log4';
import { Processstep } from '../models/ProcessStepModel';
import { Tktappr } from '../models/TktApprModule';
import { statusCodes } from '../utility/constants';
import { Util } from '../utility/utils';

class ProcessStep
{
    static async getAllPStep(){
        try {            
            const psStep = await Util.getAllData(Processstep,{});
            if(psStep.status > 299){
                let returnObj = await Util.returnObj([psStep.data],statusCodes.error,'Processstep','getallerr')
                return returnObj
            }
            else{
                let returnObj = await Util.returnObj(psStep.data,statusCodes.success,'Processstep','getall')
                return returnObj          
            }                
        } catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Processstep','getallerr')
            return returnObj       
        }
    }
}

class TktAppr
{
    async getCurrentTktStep(incidentId:number)
    {
        return await appDataSource
                    .createQueryBuilder(Tktappr, "tktappr")
                    .where("tktappr.incidentId = :incidentId", {incidentId: incidentId})
                    .andWhere("tktappr.tktstatus =  :tktstatus", {tktstatus :  'NEW'})
                    .orderBy("tktappr.tktID","ASC")
                    .getOne();
    }

    async updateTktAppr(incidentId:number, status:string, tktApproverID:number,step:string){
        try { 
            const {tktID,tktStep} = await this.getCurrentTktStep(incidentId)
            const tktStatus = status.split(' ')[1]
            if (step === tktStep){
                const tktAppr = await Util.saveData(Tktappr, {tktID,tktStatus,tktApproverID})
            }
            else throw Error('400')
        } 
        catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Tktappr','updaterr')
            return [returnObj.data]      
        }
    }

    async createTktAppr(incidentId:number){
        try { 
            let sendResults:any[] = [] ; 
            const psStep = await ProcessStep.getAllPStep()
            for(let ps of psStep.data){
                let tktAppr = {}
                tktAppr =  await this.createTktApprReq(incidentId, ps.psID, ps.psName,'NEW')
                const tktStatus = await Util.createData(Tktappr,tktAppr);
                if(tktStatus.status > 299){
                    logger.info(tktStatus)
                }
                else{
                    const result = await Util.saveData(Tktappr,tktStatus.data[0])
                    //console.log(result.data)
                    sendResults.push(result.data)
                }                  
            } 
            return sendResults
        } 
        catch (error) {
            let returnObj = await Util.returnObj([error],statusCodes.error,'Tktappr','createerr')
            return [returnObj.data]      
        }
    }

    async createTktApprReq(incidentId: number, psID: number, tktStep: string,tktStatus:string) {
        return {incidentId,  psID, tktStatus, tktStep }
    }
}

export const tstep:TktAppr = new TktAppr();