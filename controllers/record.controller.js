import Record from '../models/record.model.js';

import mongoose from 'mongoose';

import User from '../models/user.model.js';


export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes, email } = req.body;

    
    if (!amount || !type) {
      return res.status(400).json({
        message: 'Amount and type required'
      });
    }

    
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({
        message: 'Type must be income or expense'
      });
    }

    let recordUser;

    
    if (req.user.role === 'admin') {
      if (!email) {
        return res.status(400).json({
          message: 'Email is required for admin to assign record'
        });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      if (user.role !== 'viewer') {
  return res.status(400).json({
    message: 'Records can only be assigned to viewers'
  });
}

      recordUser = user._id;
    } else {
      
      recordUser = req.user._id;
    }

    const record = await Record.create({
      user: recordUser,
      amount,
      type,
      category,
      date,
      notes
    });

    res.status(201).json(record);

  } catch (error) {
    console.error('Create Record Error:', error.message);

    res.status(500).json({
      message: 'Error creating record'
    });
  }
};


export const getRecords = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 5
    } = req.query;

    let filter = {};

    
    if (req.user.role === 'viewer') {
      filter.user = req.user._id;
    }


    if (type) {
      const validTypes = ['income', 'expense'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          message: 'Invalid type. Must be "income" or "expense"'
        });
      }
      filter.type = type;
    }

    
    if (category) {
      filter.category = category;
    }

    
    if (startDate || endDate) {
      if (!startDate || !endDate) {
        return res.status(400).json({
          message: 'Both startDate and endDate are required'
        });
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({
          message: 'Invalid date format'
        });
      }

      if (start > end) {
        return res.status(400).json({
          message: 'startDate cannot be greater than endDate'
        });
      }

      filter.date = {
        $gte: start,
        $lte: end
      };
    }

    
    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.min(Number(limit) || 2, 20); // max 20 limit
    const skip = (pageNumber - 1) * pageSize;

    const totalRecords = await Record.countDocuments(filter);

    const records = await Record.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(pageSize);

    
    res.status(200).json({
      totalRecords,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalRecords / pageSize),
      count: records.length,
      data: records
    });

  } catch (error) {
    console.error('Get Records Error:', error.message);

    res.status(500).json({
      message: 'Server error while fetching records'
    });
  }
};




export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid record ID'
      });
    }
      
    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        message: 'Record not found'
      });
    }

    record.amount = req.body.amount ?? record.amount;
    record.type = req.body.type ?? record.type;
    record.category = req.body.category ?? record.category;
    record.date = req.body.date ?? record.date;
    record.notes = req.body.notes ?? record.notes;

    const updatedRecord = await record.save();

    res.json(updatedRecord);

  } catch (error) {
    console.error("Update Error:", error.message); // 🔥 show real error

    res.status(500).json({
      message: 'Error updating record',
      error: error.message
    });
  }
};





export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid record ID'
      });
    }

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        message: 'Record not found'
      });
    }

    await record.deleteOne();

    res.json({
      message: 'Record deleted successfully'
    });

  } catch (error) {
    console.error("Delete Error:", error.message); // 🔥 show real error

    res.status(500).json({
      message: 'Error deleting record',
      error: error.message
    });
  }
};