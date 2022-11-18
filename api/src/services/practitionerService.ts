import Practitioner from '../models/practitioner';
import { PractitionerInterface, PractitionerToCreate } from '../interfaces/PractitionerInterface';

/**
 * Get all practitioners
 * @returns Promise
 */
export const getAllPractitioners = async (): Promise<Object> => {
  return Practitioner.getAllPractitioners().then((practitioners) => ({
    data: practitioners,
    message: 'Successfully retrieved all practitioners',
  }));
};

/**
 * Get practitioner by id
 * @returns Promise
 */
export const getPractitionerById = async (id: number): Promise<Object> => {
  return Practitioner.getPractitionerById(id).then((practitioner) => ({
    data: practitioner,
    message: 'Successfully retrieved a practitioner',
  }));
};

/**
 * Create practitioner
 * @param  {PractitionerToCreate} practitioner
 * @returns Promise
 */
export const createPractitioner = async (practitioner: PractitionerToCreate): Promise<object> => {
  return Practitioner.createPractitioner(practitioner).then((data) => ({
    data,
    message: 'Successfully created a practitioner.',
  }));
};

/**
 * Update practitioner by id
 * @param  {PractitionerToCreate} practitioner
 * @returns Promise
 */
export const updatePractitioner = async (id: number, practitioner: PractitionerInterface): Promise<object> => {
  return Practitioner.updatePractitioner(id, practitioner).then((practitioner) => ({
    data: practitioner,
    message: 'Successfully updated a practitioner.',
  }));
};

/**
 * Delete practitioner by id
 * @param  {number} id
 * @returns Promise
 */
export const deletePractitioner = async (id: number): Promise<object> => {
  return Practitioner.deletePractitioner(id).then(() => ({
    data: [],
    message: 'Successfully deleted a practitioner.',
  }));
};
