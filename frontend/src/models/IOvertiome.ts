import { DoctorInterface } from "./ISchedule";

export interface OvertimeInterface {
  ID?: number;
  Num: number;
  Time: Date | null;

  DoctorID?: number;
  Doctor?: DoctorInterface;

  ActivityID?: number;
  Activity?: ActivitiesInterface;

  LocationworkID?: number;
  Locationwork?: LocationworkInterface;
}

export interface ActivitiesInterface {
    ID: number,
    Name: string,
	  Time: Date & TimeRanges,
}

export interface LocationworkInterface {
    ID: number,
    Name: string
	Address: string,
}