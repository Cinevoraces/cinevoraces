import type { FormEvent } from 'react';

export interface HandleSubmitAction {
  description: string, handlingFunction: (e: FormEvent, data: { password: string }, id?: number)=>void 
}
export interface HandleSubmitActions {
  [key: number]: HandleSubmitAction
}
