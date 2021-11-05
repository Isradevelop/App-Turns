export interface Schedule {
    weekNumber: number;
    employeeName: string;
    dates: string[];
    shifts: Days;
}

export interface Days {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string
}