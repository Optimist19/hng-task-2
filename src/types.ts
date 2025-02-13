export interface TicketType {
  access: string;
  remains: string;
  amount: string;
}

export type Inputs = {
  optionSelected: string;
};
export type Inputs2 = {
  name: string;
  email: string;
  special?: string;
};

export interface StepThreeTypes {
  stepCount: number;
  progressCount: number;
  imgUrl: string;
  name: string;
  email: string;
  ticketSelected: TiecketSelectedTyepes;
  noTicket: number;
  specialInput: string;
  backToStepOne: ()=>void;
}

export interface TiecketSelectedTyepes {
  access: string;
  remains: string;
  amount: string;
}

export interface StepTwoTypes {
  setName: (data: string) => void;
  setEmail: (data: string) => void;
  setSpecialInput: (data: string) => void;
  setStepCount: (data: number) => void;
  setProgressCount: (data: number) => void;
  goToStepThreeFtn: () => void;
  stepCount: number;
  progressCount: number;
  imgUrl: string;
  setImgURL: (data: string) => void;
  cancelBtnFtn: () => void;
  ticketSelected: TicketType;
  name: string;
  email: string;
  specialInput: string;
}


export interface StepTwoFtnType {
  goToStepTwoFtn: () => void;
  setNoTicket: (data: number) => void;
  setStepCount: (data: number) => void;
  stepCount: number;
  setProgressCount: (data: number) => void;
  ticketCollectionFtn: (data: TicketType) => void;
  ticketSelected: TicketType;
  progressCount: number;
  cancelBtnFtn: () => void;

}

export interface UploadedImageResponse {
  url: string;
}

export interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}
