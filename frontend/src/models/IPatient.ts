import { DoctorInterface } from "./ISchedule";

export interface PatientsInterface {
  ID: number;

  PatientsName: string;

  Age: number;

  DateAdmit: Date ;

  DoctorID: number;
  Doctor: DoctorInterface;

  PatientTypeID: number;
  PatientType: PatientTypeInterface;
  
  SymptomsID: number;
  Symptoms: SymptomsInterface; 
}

export interface PatientTypeInterface {
    ID:               number;
    Type:             string;
}

export interface SymptomsInterface {
    ID:               number;
    SymptomsName:     string;
  }