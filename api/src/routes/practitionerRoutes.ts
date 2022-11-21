import multer from 'multer';
import { Router } from 'express';

import multerMilddleware from '../middlewares/multer';
import * as practitionerController from '../controllers/practitionerController';
import { findPractitioner, practitionerValidator } from '../validators/practitionerValidator';

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
router.post('/', multerMilddleware.single('file'), practitionerValidator, practitionerController.createPractitioner);

/**
 * put /api/practitioner/{:practitioner_id}
 */
router.put(
  '/:id',
  findPractitioner,
  multerMilddleware.single('file'),
  practitionerValidator,
  practitionerController.updatePractitioner
);

/**
 * delete /api/practitioner/{:practitioner_id}
 */
router.delete('/:id', findPractitioner, practitionerController.deletePractitioner);

export default router;
