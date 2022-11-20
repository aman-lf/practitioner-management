import { Router } from 'express';

import * as practitionerController from '../controllers/practitionerController';

const router = Router();

/**
 * get /api/practitioner
 */
router.get('/', practitionerController.getAllPractitioners);

/**
 * get /api/practitioner/{:practitioner_id}
 */
router.get('/:id', practitionerController.getPractitionerById);

/**
 * post /api/practitioner
 */
router.post('/', practitionerController.createPractitioner);

/**
 * put /api/practitioner/{:practitioner_id}
 */
router.put('/:id', practitionerController.updatePractitioner);

/**
 * delete /api/practitioner/{:practitioner_id}
 */
router.delete('/:id', practitionerController.deletePractitioner);

export default router;
