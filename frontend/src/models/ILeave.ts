import { DoctorInterface } from "./ISchedule";

export interface LeaveInterface {

    ID: number,
    Reason: string;
    Fdate:Date | null;
    Ldate: Date | null;

    DoctorID?: number;
    Doctor?: DoctorInterface;

    TypeID?:number;
    Type?: TypeInterface;

    EvidenceID?:number;
    Evidence?:EvidenceInterface;
   }


export interface EvidenceInterface {

    ID: number,
    Etype: string; 
}

export interface TypeInterface {

    ID: number, 
    Tleave: string;
}