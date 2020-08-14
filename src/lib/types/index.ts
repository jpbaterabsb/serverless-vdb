import { Response } from 'express';

export interface ParamsDictionary { [key: string]: string; }
export type ParamsArray = string[];
export type Params = ParamsDictionary | ParamsArray;
export type Send<ResBody = any, T = Response<ResBody>> = (body?: ResBody) => T;
export type User = {
  id: string,
  email: string,
  type: string,
}
