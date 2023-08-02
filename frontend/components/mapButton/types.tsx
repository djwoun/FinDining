// Implements relevant types
export interface Store {
  name: string;
  rating: number;
  hours: Hours;
  address: string;
  addressLn2: string;
}

export interface Hours{
    Monday: Times;
    Tuesday: Times;
    Wednedsay: Times;
    Thursday: Times;
    Friday: Times;
    Saturday: Times;
    Sunday: Times;
}

export interface Times{
    openTime: number;
    closeTIme: number;
}
