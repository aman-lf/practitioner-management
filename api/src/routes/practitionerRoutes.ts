import { Router } from 'express';

import { findPractitioner, practitionerValidator } from '../validators/practitionerValidator';
import * as practitionerController from '../controllers/practitionerController';

const router = Router();

/**
 * get /api/practitioner
 */
router.get('/', practitionerController.getAllPractitioners);

/**
 * get /api/practitioner/{:practitioner_id}
 */
router.get('/:id', findPractitioner, practitionerController.getPractitionerById);

/**
 * post /api/practitioner
 */
router.post('/', practitionerValidator, practitionerController.createPractitioner);

/**
 * put /api/practitioner/{:practitioner_id}
 */
router.put('/:id', findPractitioner, practitionerValidator, practitionerController.updatePractitioner);

/**
 * delete /api/practitioner/{:practitioner_id}
 */
router.delete('/:id', findPractitioner, practitionerController.deletePractitioner);

export default router;
