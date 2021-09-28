export interface IContact {
  id: number;
  useremail: string;
  firstname: string;
  lastname?: string;
  email?: string;
  phone: string;
  address?: string;
  note?: string;
}

// export const data: IContact[] = [
//   {
//     firstname: "Ismael",
//     lastname: "Dembele",
//     email: "dembele@gmail.com",
//     phone: "757 224 1454",
//     address: "12345 Mcknight Dr, Pittsburgh PA 15237",
//     note: "I met him in Newport News Va",
//   },
//   {
//     firstname: "Amadou",
//     lastname: "Dembele",
//     email: "amadou@gmail.com",
//     phone: "757 224 4457",
//     address: "1 Washington blv, Newport News VA 23608",
//     note: "I met him in Houston, TX",
//   },
// ];
