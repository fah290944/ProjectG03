export interface ScheduleInterface {

    ID: number;
    // entity
    DoctorID : number;
    Doctor: DoctorInterface;

    LocationID : number;
    Location: LocationInterface;

    MedActivityID : number;
    MedActivity: LocationInterface;

    Time: Date;

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface DoctorInterface {

    ID: number;
    Name: string;
//หลังบ้าน ไปเว็บ เว็บมา models
   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface MedActivityInterface {

    ID: number;
    Name: string;
//หลังบ้าน ไปเว็บ เว็บมา models
   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

export interface LocationInterface {

    ID: number;
    Name: string;

   //แสดงข้อมูลมาแสดงมาจาก หลังบ้าน
}

