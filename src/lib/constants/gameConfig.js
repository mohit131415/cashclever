export const GAME_CONFIG = {
    levels: [
      {
        id: 1,
        title: 'Savings Starter',
        pointsRequired: 0,
        rewards: {
          points: 100,
          badge: '🌱'
        }
      },
      {
        id: 2,
        title: 'Budget Master',
        pointsRequired: 500,
        rewards: {
          points: 200,
          badge: '💰'
        }
      },
      {
        id: 3,
        title: 'Investment Guru',
        pointsRequired: 1000,
        rewards: {
          points: 300,
          badge: '📈'
        }
      }
    ],
    pointsSystem: {
      expenseTracking: 10,
      savingsGoalCreated: 50,
      savingsGoalAchieved: 100,
      quizCompleted: 75,
      perfectQuizScore: 150
    },
    quizCategories: [
      'Budgeting Basics',
      'Saving Strategies',
      'Smart Spending',
      'Financial Goals'
    ]
  }