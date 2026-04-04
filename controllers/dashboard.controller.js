import Record from '../models/record.model.js';

export const getSummary = async (req, res) => {
  try {
    let match = {};
    
    
    if (req.user.role === 'viewer') {
      match.user = req.user._id;
    }
    

    
    const totals = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    totals.forEach(item => {
      if (item._id === 'income') totalIncome = item.total;
      if (item._id === 'expense') totalExpense = item.total;
    });

    const netBalance = totalIncome - totalExpense;

    
    const categoryWise = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' }
        }
      }
    ]);

    
    const recentTransactions = await Record.find(match)
      .sort({ createdAt: -1 })
      .limit(2);


    const monthlyTrends = await Record.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            month: { $month: '$date' },
            year: { $year: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    
    res.status(200).json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryWise,
      recentTransactions,
      monthlyTrends
    });

  } catch (error) {
    console.error('Dashboard Error:', error.message);

    res.status(500).json({
      message: 'Error fetching dashboard data'
    });
  }
};