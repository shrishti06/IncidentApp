import { Request, Response } from "express";
import { Employee } from "../models/EmployeeModel";
import { statusCodes, csvColumns, csvMapObject } from "../utility/constants";
import { Util } from "../utility/utils";
import csv from "csv-parser";
import fs from "fs";
import { appDataSource } from "../database/database";
import { Listdatamaster } from "../models/ListDataMasterModule";

export class EmployeeController {
  async createEmployee(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      console.log(req.body);
      const employee = await Util.createData(Employee, req.body);
      if (employee.status > 299) {
        return res.json(employee);
      } else {
        const result = await Util.saveData(Employee, employee.data);
        return res.json(result);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Employee",
        "createerr"
      );
      return res.json(returnObj);
    }
  }

  async getByIDEmployee(req: Request, res: Response) {
    try {
      // const user = await appDataSource.getRepository(Employee).create(req.body)
      const lparams = req.params;
      const employee = await Util.getbyIDData(Employee, { empId: lparams.id });
      if (employee.status > 299) {
        return res.json(employee);
      } else {
        let returnObj = await Util.returnObj(
          employee.data,
          statusCodes.success,
          "Employee",
          "getsingle"
        );
        return res.json(returnObj);
      }
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Employee",
        "getsingle"
      );
      return res.json(returnObj);
    }
  }

  async getEmpByDtlID(empId) {
    try {
      const employee = await Util.getbyIDData(Employee, {empId});
      if(employee.status > 299){
        return 0;
    }
    else{
        let returnObj = await Util.returnObj(employee.data,statusCodes.success,'employee','getsingle');
        const empMSDId = (returnObj.data[0]).empMSDId;
        return empMSDId;   
    }                
  } catch (error) {
    let returnObj = await Util.returnObj([error],statusCodes.error,'employee','getsinglerr')
    return returnObj      
    }
  }

  async getAllEmployee(req: Request, res: Response) {
    try {
      var employee = [];

      var count = 0;

      const lquery = req.query;

      var empname =
        lquery.empname == undefined ||
        lquery.empname == "undefined" ||
        lquery.empname == null
          ? ""
          : lquery.empname;

      var dept =
        lquery.dept == undefined ||
        lquery.dept == "undefined" ||
        lquery.dept == null
          ? ""
          : lquery.dept;

      var page =
        lquery.page == undefined ||
        lquery.page == "undefined" ||
        lquery.page == null
          ? 1
          : Number(lquery.page);

      var limit =
        lquery.limit == undefined ||
        lquery.limit == "undefined" ||
        lquery.limit == null
          ? 50
          : Number(lquery.limit);

      var offset = page == 1 ? 0 : (page - 1) * limit;

      employee = await appDataSource.manager.query(
        `select * FROM incident.employee where (name LIKE '%${empname}%' or empMSDId LIKE '%${empname}%') and department LIKE '%${dept}%' ORDER BY name LIMIT ${limit} OFFSET ${offset}`,
        []
      );

      count = await appDataSource.manager.query(
        `select count(*) as count FROM incident.employee where (name LIKE '%${empname}%' or empMSDId LIKE '%${empname}%') and department LIKE '%${dept}%'`,
        []
      );

      var returnData = JSON.parse(JSON.stringify(employee));

      let returnObj = await Util.returnObjCount(
        returnData,
        statusCodes.success,
        "Employee",
        "getall",
        Number(count[0].count)
      );

      return res.json(returnObj);
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Employee",
        "getallerr"
      );

      return res.json(returnObj);
    }
  }

  async getDeptByEmail(req: Request, res: Response) {
    try {
      var employee = [];
      const lquery = req.params;
      var email =
        lquery.id == undefined || lquery.id == "undefined" || lquery.id == null
          ? ""
          : lquery.id;
      employee = await appDataSource.manager.query(
        `select department,emailID,manager, empId FROM incident.employee where emailID LIKE '%${email}%'`,
        []
      );
      var returnData = JSON.parse(JSON.stringify(employee));
      let returnObj = await Util.returnObj(
        returnData,
        statusCodes.success,
        "Employee",
        "getall"
      );
      return res.json(returnObj);
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Employee",
        "getallerr"
      );
      return res.json(returnObj);
    }
  }

  async saveEmployeesFromFile(req: Request, res: Response) {
    try {
      let csvData = [];
      fs.createReadStream(`./attachments/${req.file.filename}`)
        .pipe(
          csv({
            mapHeaders: ({ header }) => csvMapObject[header],
          })
        )
        .on("data", async (data) => {
          console.log("data", data);
          csvData.push(data);
        })
        .on("end", async () => {
          var csvresponse = await Util.getCSVEmails(csvData);
          var dept = await Util.getbyIDData(Listdatamaster, {
            lstMstCode: "Dept",
          });
          if (
            (dept.status == 200 && dept.data[0] == null) ||
            dept.status > 299
          ) {
            const lstmasterdept = await Util.createData(Listdatamaster, {
              lstMstCode: "Dept",
              lstMstDesc: csvresponse.depts,
            });
            if (lstmasterdept.status < 299) {
              await Util.saveData(Listdatamaster, lstmasterdept.data);
            }
          } else if (dept.status == 200 && dept.data[0] != null) {
            var newdept = {
              ...dept.data[0],
              ...{ lstMstDesc: csvresponse.depts },
            };
            await Util.saveData(Listdatamaster, newdept);
            // await appDataSource.getRepository(Listdatamaster).save(newdept)
          }
          if (csvresponse.errors.length > 0) {
            let returnObj = await Util.returnObj(
              csvresponse.errors,
              statusCodes.error,
              "Employee",
              "createerr"
            );
            return res.json(returnObj);
          } else {
            await appDataSource
              .createQueryBuilder()
              .update(Employee)
              .set({ foundInFile: false })
              .where("'employee.emailID' NOT IN (:emails)", {
                emails: csvresponse.csvEmails,
              })
              .execute();
            // await appDataSource.manager.query(`UPDATE employee SET "foundInFile" = $1 WHERE employee."emailID" NOT IN ($2)`, [
            //     false,
            //     csvresponse.csvEmails
            // ]);
            let returnObj = await Util.returnObj(
              csvresponse.csvEmails,
              statusCodes.success,
              "Employee",
              "create"
            );
            return res.json(returnObj);
          }
        });
    } catch (error) {
      let returnObj = await Util.returnObj(
        [error],
        statusCodes.error,
        "Employee",
        "createerr"
      );
      return res.json(returnObj);
    }
  }
}
