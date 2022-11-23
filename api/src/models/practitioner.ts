import db from '../db';
import { PractitionerInterface, PractitionerToCreate } from '../interfaces/practitionerInterface';

/**
 * Practitioner model.
 */
class Practitioner {
  public static table = 'practitioners';

  /**
   * Get all practitioners
   */
  public static async getAllPractitioners() {
    const practitioners = await db(Practitioner.table).select();
    return practitioners;
  }

  /**
   * Get practitioner by id
   * @param  {string} email
   */
  public static async getPractitionerById(id: number) {
    const practitioner = await db(Practitioner.table).where({ id }).first();

    return practitioner;
  }

  /**
   * Create practitioner
   * @param  {UserToCreate} practitioner
   */
  public static async createPractitioner(practitioner: PractitionerToCreate) {
    const newPractitioner = await db(Practitioner.table).insert(practitioner);

    return newPractitioner;
  }

  /**
   * Update practitioner by id
   * @param  {number} id
   * @param  {object} practitioner
   */
  public static async updatePractitioner(id: number, practitioner: PractitionerInterface) {
    console.log(practitioner);
    const updatedPractitioner = await db(Practitioner.table).where({ id }).update(practitioner).returning('*');

    return updatedPractitioner;
  }

  /**
   * Delete practitioner by id
   * @param  {object} id
   */
  public static async deletePractitioner(id: number) {
    await db(Practitioner.table).where({ id }).delete();
  }
}

export default Practitioner;
