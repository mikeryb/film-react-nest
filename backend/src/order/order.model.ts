export interface IOrderTicket {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export interface IOrderRequest {
  email: string;
  phone: string;
  tickets: IOrderTicket[];
}
