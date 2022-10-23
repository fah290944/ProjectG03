import { DoctorInterface } from "./ISchedule";

export interface BorrowInterface {

    ID: number;
    // entity
    DoctorID : number;
    Doctor: DoctorInterface;

    WorklocationID : number;
    Worklocation: WorklocationInterface;

    MedicalEquipmentID : number;
    MedicalEquipment: MedicalEquimentInterface;

    Quant: number;

    BorrowDate: Date;
    ReturnDate: Date;

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

//MedicalEquimentInterface
export interface MedicalEquimentInterface {

    ID: number;
    Name:string;

    TypeofUseID: number;
    TypeofUse: TypeofUseInterface;
   
}
export interface TypeofUseInterface {

    ID: number;
    Name: string;

}

export interface WorklocationInterface {

    ID: number;
    Name:string;

}
