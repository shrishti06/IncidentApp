import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Index,
  PrimaryColumn,
} from "typeorm";
import { Incident } from "./IncidentModel";

@Index("unique_constraint", ["emailID", "empMSDId"], { unique: true })
@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  empId: number;

  @Column({ type: "varchar", nullable: false })
  empMSDId: string;

  @Column("text")
  name: string;

  @Column({ type: "varchar", nullable: false })
  emailID: string;

  @Column("text")
  department: string;

  @Column("boolean", { default: true })
  foundInFile: boolean;

  @Column("varchar")
  manager: string;

  @OneToMany(() => Incident, (incident) => incident.empId)
  @JoinColumn({ name: "empId" })
  incident: Incident[];
}
