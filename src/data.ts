export interface TicketType {
  access: string;
  remains: string;
  amount: string;
}

export type Inputs = {
  optionSelected: string
  
}
export type Inputs2 = {
  name: string;
  email: string;
  special?: string;
}

export const ticket: TicketType[] = [
  {
    access: "regular access",
    remains: "20 left!",
    amount: "Free"
  },
  {
    access: "vip access",
    remains: "20 left!",
    amount: "$50"
  },
  {
    access: "vvip access",
    remains: "20 left!",
    amount: "$150"
  }
];
