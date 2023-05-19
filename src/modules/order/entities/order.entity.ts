export class Order {
  date: Date;
  buyOrder: string;
  sessionId: string;
  rut: string;
  branchCode: number;
  products: object[];
  total: number;
}