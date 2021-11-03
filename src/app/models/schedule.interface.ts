export interface Schedule {
    weekNumber: number;
    employeeName: string;
    dates: string[];
    shifts: Shift;
}

export interface Shift {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string
}