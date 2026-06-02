const gameOptions = {
  income: {
    weeklyAllowance: [
      { id: 'allowance_basic', name: 'Basic Allowance', amount: 50, icon: '💵', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 1.0 },
      { id: 'allowance_bonus', name: 'Bonus Allowance', amount: 30, icon: '💰', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.3, requires: ['hardworking', 'organized'] }
    ],
    partTimeJob: [
      { id: 'retail', name: 'Retail Assistant', amount: 120, icon: '🏪', hours: 30, tiredness: 75, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
      { id: 'fnb', name: 'F&B Service', amount: 140, icon: '🍽️', hours: 30, tiredness: 75, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
      { id: 'tutor', name: 'Tutoring', amount: 160, icon: '📚', hours: 30, tiredness: 75, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.6, requires: ['hardworking'] },
      { id: 'admin', name: 'Admin Work', amount: 130, icon: '📋', hours: 30, tiredness: 75, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.7, requires: ['organized'] }
    ],
    miscIncome: [
      { id: 'birthday', name: 'Birthday Money', amount: 100, icon: '🎂', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.08, oneTime: true },
      { id: 'redpacket', name: 'Red Packet', amount: 80, icon: '🧧', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.15, oneTime: true },
      { id: 'chores', name: 'Help with Chores', amount: 20, icon: '🧹', hours: 3, tiredness: 8, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.9 },
      { id: 'selling', name: 'Sell Old Items', amount: 60, icon: '🏷️', hours: 5, tiredness: 10, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6 },
      { id: 'freelance', name: 'Freelance Work', amount: 200, icon: '💻', hours: 12, tiredness: 20, weeks: [6,7,8,9,10,11,12], probability: 0.5, requires: ['creative', 'tech'] },
      { id: 'competition_prize', name: 'Competition Prize', amount: 150, icon: '🏆', hours: 0, tiredness: 0, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.12, oneTime: true, requires: ['competitive'] }
    ]
  },
  expenses: {
    foodBeverages: [
      { id: 'daily_meals', name: 'Daily Meals', amount: 35, icon: '🍱', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 1.0 },
      { id: 'snacks', name: 'Snacks & Drinks', amount: 20, icon: '🍿', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.9 },
      { id: 'bubble_tea', name: 'Bubble Tea', amount: 15, icon: '🧋', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
      { id: 'restaurant', name: 'Eat Out', amount: 45, icon: '🍽️', hours: 2, tiredness: 3, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6, requires: ['social'] },
      { id: 'cafe', name: 'Café Hangout', amount: 25, icon: '☕', hours: 2, tiredness: 2, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.7, requires: ['social'] }
    ],
    rest: [
      { id: 'sleep_in', name: 'Sleep In', amount: 0, icon: '😴', hours: 30, tiredness: -25, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 1.0 },
      { id: 'nap', name: 'Take a Nap', amount: 0, icon: '💤', hours: 8, tiredness: -10, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 1.0 }
    ],
    hobbies: {
      swimming: [
        { id: 'swim_daily', name: 'Daily Swimming', amount: 30, icon: '🏊', hours: 5, tiredness: 12, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.9 },
        { id: 'swim_competition', name: 'Swimming Competition', amount: 80, icon: '🏅', hours: 10, tiredness: 25, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.4 },
        { id: 'swim_gear', name: 'Swimming Gear', amount: 60, icon: '🥽', hours: 0, tiredness: 0, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.3 }
      ],
      gaming: [
        { id: 'game_purchase', name: 'New Game', amount: 60, icon: '🎮', hours: 8, tiredness: 15, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
        { id: 'game_subscription', name: 'Gaming Subscription', amount: 35, icon: '🎯', hours: 6, tiredness: 12, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
        { id: 'esports_event', name: 'Esports Event', amount: 50, icon: '🏆', hours: 4, tiredness: 8, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.4 }
      ],
      reading: [
        { id: 'books', name: 'Buy Books', amount: 40, icon: '📚', hours: 6, tiredness: 5, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
        { id: 'bookstore', name: 'Bookstore Visit', amount: 25, icon: '📖', hours: 3, tiredness: 3, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
        { id: 'book_club', name: 'Book Club Fee', amount: 20, icon: '👥', hours: 2, tiredness: 4, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 }
      ],
      music: [
        { id: 'music_lessons', name: 'Music Lessons', amount: 80, icon: '🎵', hours: 4, tiredness: 8, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
        { id: 'concert', name: 'Concert Ticket', amount: 100, icon: '🎤', hours: 4, tiredness: 10, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.4 },
        { id: 'music_gear', name: 'Music Equipment', amount: 120, icon: '🎸', hours: 0, tiredness: 0, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.3 }
      ],
      sports: [
        { id: 'sports_gear', name: 'Sports Equipment', amount: 70, icon: '⚽', hours: 0, tiredness: 0, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6 },
        { id: 'sports_training', name: 'Training Session', amount: 50, icon: '🏃', hours: 6, tiredness: 14, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
        { id: 'sports_tournament', name: 'Tournament Fee', amount: 60, icon: '🏆', hours: 8, tiredness: 20, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.4 }
      ],
      art: [
        { id: 'art_supplies', name: 'Art Supplies', amount: 55, icon: '🎨', hours: 5, tiredness: 6, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
        { id: 'art_class', name: 'Art Class', amount: 70, icon: '🖌️', hours: 4, tiredness: 7, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6 },
        { id: 'art_exhibition', name: 'Exhibition Visit', amount: 30, icon: '🖼️', hours: 3, tiredness: 5, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 }
      ],
      cooking: [
        { id: 'ingredients', name: 'Cooking Ingredients', amount: 45, icon: '🥘', hours: 4, tiredness: 8, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.9 },
        { id: 'cooking_class', name: 'Cooking Class', amount: 80, icon: '👨‍🍳', hours: 3, tiredness: 6, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 },
        { id: 'kitchen_tools', name: 'Kitchen Tools', amount: 60, icon: '🔪', hours: 0, tiredness: 0, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.4 }
      ],
      photography: [
        { id: 'photo_prints', name: 'Photo Printing', amount: 35, icon: '🖼️', hours: 2, tiredness: 3, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
        { id: 'photo_trip', name: 'Photography Trip', amount: 70, icon: '🌄', hours: 8, tiredness: 16, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 },
        { id: 'camera_gear', name: 'Camera Accessories', amount: 100, icon: '📸', hours: 0, tiredness: 0, weeks: [5,6,7,8,9,10,11,12], probability: 0.3 }
      ],
      dance: [
        { id: 'dance_class', name: 'Dance Class', amount: 60, icon: '💃', hours: 4, tiredness: 10, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.8 },
        { id: 'dance_outfit', name: 'Dance Outfit', amount: 50, icon: '👗', hours: 0, tiredness: 0, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.5 },
        { id: 'dance_competition', name: 'Dance Competition', amount: 80, icon: '🏆', hours: 10, tiredness: 22, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.4 }
      ],
      tech: [
        { id: 'tech_course', name: 'Online Course', amount: 50, icon: '💻', hours: 6, tiredness: 8, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
        { id: 'tech_gadget', name: 'Tech Gadget', amount: 120, icon: '⌚', hours: 0, tiredness: 0, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.4 },
        { id: 'tech_event', name: 'Tech Event', amount: 40, icon: '🎪', hours: 4, tiredness: 6, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 }
      ]
    },
    miscActivities: [
      { id: 'transport', name: 'Transport', amount: 25, icon: '🚌', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 1.0 },
      { id: 'school_supplies', name: 'School Supplies', amount: 20, icon: '✏️', hours: 0, tiredness: 0, weeks: [1,2,3,4,5,6,7,8,9,10,11,12], probability: 0.7 },
      { id: 'phone_bill', name: 'Phone Bill', amount: 35, icon: '📱', hours: 0, tiredness: 0, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.9 },
      { id: 'movies', name: 'Movies', amount: 40, icon: '🎬', hours: 3, tiredness: 4, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6 },
      { id: 'shopping', name: 'Shopping', amount: 60, icon: '🛍️', hours: 3, tiredness: 6, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.5 },
      { id: 'gifts', name: 'Gifts for Friends', amount: 50, icon: '🎁', hours: 2, tiredness: 3, weeks: [3,4,5,6,7,8,9,10,11,12], probability: 0.4, requires: ['generous', 'social'] },
      { id: 'haircut', name: 'Haircut', amount: 25, icon: '💇', hours: 1, tiredness: 2, weeks: [2,3,4,5,6,7,8,9,10,11,12], probability: 0.6 },
      { id: 'emergency', name: 'Emergency Expense', amount: 100, icon: '🚨', hours: 0, tiredness: 0, weeks: [5,6,7,8,9,10,11,12], probability: 0.2 },
      { id: 'medical', name: 'Medical/Dental', amount: 80, icon: '🏥', hours: 0, tiredness: 0, weeks: [4,5,6,7,8,9,10,11,12], probability: 0.25 }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = gameOptions;
}
