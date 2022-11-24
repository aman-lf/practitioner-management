import Boom from '@hapi/boom';

import Practitioner from '../models/practitioner';
import { upload } from '../firebase';
import { PractitionerInterface, PractitionerToCreate } from '../interfaces/PractitionerInterface';

const uploadImage = (file, name): string => {
  const ext = file.originalname.split('.').pop();
  const filename = `${name}_${Date.now()}.${ext}`;

  upload(filename, file); // Uploading file to firebase
  return filename;
};

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
  return Practitioner.getPractitionerById(id).then((practitioner) => {
    if (!practitioner) {
      throw Boom.notFound('Practitioner not found. Invalid id');
    }
    return { data: practitioner, message: 'Successfully retrieved a practitioner' };
  });
};

/**
 * Create practitioner
 * @param  {PractitionerToCreate} practitioner
 * @returns Promise
 */
export const createPractitioner = async (
  practitioner: PractitionerToCreate,
  file: Express.Multer.File
): Promise<object> => {
  let practitionerUpdated = practitioner;
  if (file) {
    const filename = uploadImage(file, practitioner.name);
    practitionerUpdated = { ...practitioner, photo: filename };
  }
  return Practitioner.createPractitioner(practitionerUpdated).then((data) => ({
    data,
    message: 'Successfully created a practitioner.',
  }));
};

/**
 * Update practitioner by id
 * @param  {PractitionerToCreate} practitioner
 * @returns Promise
 */
export const updatePractitioner = async (
  id: number,
  practitioner: PractitionerInterface,
  file: Express.Multer.File
): Promise<object> => {
  let practitionerUpdated = practitioner;
  // converting string to json
  if (practitioner['specialization'])
    practitionerUpdated['specialization'] = JSON.parse(practitioner['specialization'].toString());
  if (file) {
    const filename = uploadImage(file, practitioner.name);
    practitionerUpdated = { ...practitioner, photo: filename };
  }
  console.log(practitionerUpdated);
  return Practitioner.updatePractitioner(id, practitionerUpdated).then((practitioner) => ({
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
