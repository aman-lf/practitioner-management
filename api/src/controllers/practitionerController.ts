import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import * as practitionerService from '../services/practitionerService';

/**
 * Get all practitioners
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const getAllPractitioners = (req: Request, res: Response, next: NextFunction) => {
  practitionerService
    .getAllPractitioners()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get practitioner by id
 * @returns Promise
 */
export const getPractitionerById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  practitionerService
    .getPractitionerById(+id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Create practitioner
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const createPractitioner = (req: Request, res: Response, next: NextFunction) => {
  practitionerService
    .createPractitioner(req.body)
    .then((data) => res.status(HttpStatus.CREATED).json(data))
    .catch((error) => next(error));
};

/**
 * Update practitioner by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const updatePractitioner = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  practitionerService
    .updatePractitioner(+id, req.body)
    .then((data) => res.json(data))
    .catch((error) => next(error));
};

/**
 * Delete practitioner by id
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const deletePractitioner = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  practitionerService
    .deletePractitioner(+id)
    .then((data) => res.status(HttpStatus.ACCEPTED).json(data))
    .catch((error) => next(error));
};
