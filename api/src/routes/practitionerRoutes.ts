import multer from 'multer';
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
router.post('/', multer().single('file'), practitionerValidator, practitionerController.createPractitioner);

/**
 * put /api/practitioner/{:practitioner_id}
 */
router.put(
  '/:id',
  findPractitioner,
  multer().single('file'),
  practitionerValidator,
  practitionerController.updatePractitioner
);

/**
 * delete /api/practitioner/{:practitioner_id}
 */
router.delete('/:id', findPractitioner, practitionerController.deletePractitioner);

export default router;
