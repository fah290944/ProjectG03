export interface DoctorsInterface {

    ID?: number;
    PersonalID: number;
    Name: string;
    Position: string;
    Email?: string;
    Password?: string;
    Salary: number;
    Tel: string;
    Gender: string;
    DateOfBirth: Date | null;
    YearOfStart: Date | null;
    Address: string;

    AdminID: number;
    Admin: AdminsInterface;
    WorkPlaceID?: number;
    WorkPlace?: WorkPlacesInterface;
    MedicalFieldID?: number;
    MedicalField?: MedicalFieldsInterface;

}

export interface AdminsInterface {

    ID?: number;
    Ausername?: string;
    Apassword?: string;
    Aname: string;
    Tel: string;
    Email: string;

}

export interface MedicalFieldsInterface {

    ID?: number,
    Bname: string;

   }

export interface WorkPlacesInterface {

    ID?: number,
    Pname: string;
    Paddress: string;

}