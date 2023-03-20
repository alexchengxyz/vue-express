import express from "express";
import {
  getList,
  getData,
  addData,
  deleteData,
  updateData,
} from '../controllers/customerService'

const router = express.Router()

router.route('/').get(getList).post(addData);
router.route('/:id').get(getData).put(updateData).delete(deleteData);

export default router;
