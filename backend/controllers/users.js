import Users from '../models/Users';
import asyncWrapper from '../middleware/async';
import { customError } from '../errors/custom-error';


// 取得列表
const getList = asyncWrapper(async (req, res) => {
  const {
    first_result,
    max_result,
    order = 'desc',
    sort = 'created_at',
  } = req.query;

  const firstResult = Number(first_result) || 0;
  const maxResult = Number(max_result) || 20;

  const ret = await Users
    .find({})
    .sort({ [sort]: order === 'desc' ? -1 : 1 })
    .skip(firstResult)
    .limit(maxResult);

  const total = await Users.countDocuments({});

  res.status(200).json({
    result: 'ok',
    ret,
    pagination: {
      first_result: firstResult,
      max_result: maxResult,
      total: total || 0,
    }
  });
});

// 取得單筆資料
const getData = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const ret = await Users.findOne({ _id: id });

  if (!ret) {
    return next(customError(`找不到此ID : ${id}`, 404))
  }

  res.status(200).json({ result: 'ok', ret });
});

// 新增資料
const addData = asyncWrapper(async (req, res) => {
  const {
    name,
    username,
    enable,
  } = req.body;

  const ret = new Users({ name, username, enable });

  await ret.save();

  res.status(201).json({ result: 'ok', ret });
})

// 更新單筆資料
const updateData = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const ret = await Users.findOneAndUpdate({ _id: id.trim() }, req.body, {
      new: true, // 返回結果
      runValidators: true, // 驗證格式
    });

    if (!ret) {
      return next(`找不到此ID : ${id}`, 404);
    }

    res.status(200).json({ result: 'ok', ret });
});

// 移除單筆資料
const deleteData = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const ret = await Users.findOneAndDelete({ _id: id });

  if (!ret) {
    return next(customError(`找不到此ID : ${id}`, 404))
  }

  res.status(200).json({ result: 'ok' });
});

export {
  getList,
  getData,
  addData,
  updateData,
  deleteData,
}
