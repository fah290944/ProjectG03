import { WorkPlaceInterface } from "./IWorkPlace";

export interface ScheduleInterface {

    ID: number;
    // entity
    WokrPlaceID : number;
    WorkPlace: WorkPlaceInterface;

    MedActivityID : number;
    MedActivity: WorkPlaceInterface;

    Time: Date;

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
   }