import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Employee } from "./EmployeeModel";
import { Attachment } from "./AttachmentModel";
import { Incidentstatus } from "./IncidentStatusModel";
import { Tktappr } from "./TktApprModule";

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  incidentId: number;

  @Column("integer", { default: 0 })
  ISOID: number;

  @Column("integer", { default: 0 })
  CISOID: number;

  @Column("integer", { default: 0 })
  MRID: number;

  @Column("integer", { default: 0 })
  investigatorID: number;

  @Column("integer", { default: 0 })
  createdBy: number;

  @Column("text",{ nullable: true })
  description: string;

  @Column("text", { nullable: true })
  impact: string;

  @Column("text", { nullable: true })
  impactPostSeverity: string;

  @Column({ type: "timestamp", nullable: true })
  reportDateTime: string;

  @Column("text", { nullable: true })
  correction: string;

  @Column("text", { nullable: true })
  correctiveAction: string;

  @Column("text", { nullable: true })
  rootCause: string;

  @Column("date", { nullable: true })
  reviewDate: string;

  @Column("date", { nullable: true })
  correctionDate: string;

  @Column("text", { nullable: true })
  mrRemarks: string;

  @Column("date", { nullable: true })
  mrDate: string;

  @Column("boolean", { default: false })
  isDisplinaryReq: boolean;

  @Column("text", { nullable: true })
  isoRemark: string;

  @Column("date", { nullable: true })
  isoRemarkDate: string;

  @Column("text", { nullable: true })
  cisoRemark: string;

  @Column("text", { nullable: true })
  incidentType: string;

  @Column("text", { nullable: true })
  status: string;

  @Column("date", { nullable: true })
  closeDate: string;

  @Column("integer", { default:0 })
  cVal: number;

  @Column("integer", { default:0  })
  iVal: number;

  @Column("integer", { default:0  })
  aVal: number;

  @ManyToOne(() => Employee, { nullable: true })
  @JoinColumn({ name: "empId" })
  empId: number;

  @OneToMany(() => Attachment, (attachment) => attachment.Incident)
  attachments: Attachment[];

  @OneToMany(
    () => Incidentstatus,
    (incidentStatus) => incidentStatus.incidentId
  )
  @JoinColumn({ name: "incidentId" })
  incidentStatus: Incidentstatus[];

  @OneToMany(() => Tktappr, (tktappr) => tktappr.incidentId)
  @JoinColumn({ name: "incidentId" })
  tktappr: Tktappr[];
}
