import { ExpenseContextType } from './../../@types/expenses';
import { createContext } from "react";

export const ExpenseContext = createContext<ExpenseContextType | null>(null);