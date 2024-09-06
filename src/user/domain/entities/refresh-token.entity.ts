// /* eslint-disable prettier/prettier */
// import { v4 as uuidv4 } from 'uuid';

// export interface RefreshToken {
//   id: string;
//   name: string;
//   exp: Date;
//   token: string;
//   isValide: boolean;
// }

// export class User {
//   constructor(private attributes: RefreshToken) {}

//   static create(data: {
//     id?: string;
//     name: string;
//     email: string;
//     password: string;
//     urlPhoto?: string;
//   }) {
//     return new User({
//       id: data.id ?? uuidv4(),
//       name: data.name,
//     });
//   }
// }
