export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string; // This field should be hashed when created
  createdAt: Date;
  updatedAt: Date | null;

  // Relations
  Board?: IBoard[]; // Optional, as it might not be included in every query
}

export interface IBoard {
  id: string; // UUID
  userId: number;
  name: string;

  // Relations
  user?: IUser; // Optional relation to User
  Column?: IColumn[]; // Optional array of Columns
}

export interface IColumn {
  id: string; // UUID
  boardId: string;
  name: string;
  position: number;

  // Relations
  Board?: IBoard; // Optional relation to Board
  Card?: ICard[]; // Optional array of Cards
}

export interface ICard {
  id: string; // UUID
  columnId: string;
  content: string;
  position: number;

  // Relations
  Column?: IColumn; // Optional relation to Column
}

export type CardColumnPosition = {
  cardIndex: number;
  columnIndex: number;
};
