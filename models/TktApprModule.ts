import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Processstep } from "./ProcessStepModel"
import { Incident } from "./IncidentModel"

@Entity()
export class Tktappr {
    @PrimaryGeneratedColumn()
    tktID: number

    @Column("integer",{nullable:true})
    tktApproverID: number

    @Column("text",{nullable:true})
    tktStep: string

    @Column("text")
    tktStatus: string   

    @ManyToOne(()=> Processstep, {nullable:true})
    @JoinColumn({name: 'psID'})
    psID: Processstep;  

    @ManyToOne(()=> Incident, {nullable:true})
    @JoinColumn({name: 'incidentId'})
    incidentId: Incident;
    
}