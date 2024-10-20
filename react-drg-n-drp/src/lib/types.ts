export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string; // This field should be hashed when created
  createdAt: Date;
  updatedAt: Date | null;

  // Relations
  Board?: Board[]; // Optional, as it might not be included in every query
}

export interface Board {
  id: string; // UUID
  userId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: User; // Optional relation to User
  Column?: Column[]; // Optional array of Columns
}

export interface Column {
  id: string; // UUID
  boardId: string;
  name: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  Board?: Board; // Optional relation to Board
  Card?: Card[]; // Optional array of Cards
}

export interface Card {
  id: string; // UUID
  columnId: string;
  content: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  Column?: Column; // Optional relation to Column
}
