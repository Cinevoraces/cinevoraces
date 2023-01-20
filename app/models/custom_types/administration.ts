import type { FormEvent } from 'react';

export interface HandleSubmitAction {
  description: string, handlingFunction: (e: FormEvent, id: number, data: { password: string })=>void 
}
export interface HandleSubmitActions {
  [key: number]: HandleSubmitAction
}
