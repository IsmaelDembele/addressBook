export interface IContact {
  firstname: string;
  lastname?: string;
  email?: string;
  phone: string;
  address?: string;
  note?: string;
};

export const data: IContact[] = [
  {
    firstname: "Ismael",
    lastname: "Dembele",
    email: "dembele@gmail.com",
    phone: "757 224 1454",
    address: "12345 Mcknight Dr, Pittsburgh PA 15237",
    note: "I met him in Newport News Va",
  },
];
