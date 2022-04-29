const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();

const adminController = require('../controllers/adminController');
const clientController = require('../controllers/clientController');
const licenseController = require('../controllers/licenseController');

const postController = require('../controllers/postController');

//_______________________________ Admin management_______________________________

router.route('/admin/create').post(catchErrors(adminController.create));
router.route('/admin/read/:id').get(catchErrors(adminController.read));
router.route('/admin/update/:id').patch(catchErrors(adminController.update));
router.route('/admin/delete/:id').delete(catchErrors(adminController.delete));
router.route('/admin/search').get(catchErrors(adminController.search));
router.route('/admin/list').get(catchErrors(adminController.list));

router
  .route('/admin/password-update/:id')
  .patch(catchErrors(adminController.updatePassword));
//list of admins ends here

//_____________________________________ API for clients __________________________
router.route('/client/create').post(catchErrors(clientController.create));
router.route('/client/read/:id').get(catchErrors(clientController.read));
router.route('/client/update/:id').patch(catchErrors(clientController.update));
router.route('/client/delete/:id').delete(catchErrors(clientController.delete));
router.route('/client/search').get(catchErrors(clientController.search));
router.route('/client/list').get(catchErrors(clientController.list));

//_____________________________________ API for posts ___________________________
router.route('/post/create').post(catchErrors(postController.create));
router.route('/post/read/:id').get(catchErrors(postController.read));
router.route('/post/update/:id').patch(catchErrors(postController.update));
router.route('/post/delete/:id').delete(catchErrors(postController.delete));
router.route('/post/search').get(catchErrors(postController.search));
router.route('/post/list').get(catchErrors(postController.list));

//_____________________________________ API for Licenses ___________________________
router.route('/license/create').post(catchErrors(licenseController.create));
router.route('/license/read/:id').get(catchErrors(licenseController.read));
router
  .route('/license/update/:id')
  .patch(catchErrors(licenseController.update));
router
  .route('/license/delete/:id')
  .delete(catchErrors(licenseController.delete));
router.route('/license/search').get(catchErrors(licenseController.search));
router.route('/license/list').get(catchErrors(licenseController.list));

module.exports = router;
