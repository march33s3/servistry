// scripts/seedCategories.js
const mongoose = require('mongoose');
const Category = require('../models/Category');

// Only load dotenv if running as standalone script
if (require.main === module) {
  require('dotenv').config();
}

const categories = [
  {
    name: 'Birth',
    slug: 'birth',
    icon: '🍼',
    description: 'Welcoming a new baby into your family',
    categorySpecificQuestion: "What's your biggest priority to manage right now?",
    questionOptions: [
      { text: 'Getting enough sleep and rest', value: 'sleep-rest', order: 1 },
      { text: 'Keeping up with household tasks', value: 'household-tasks', order: 2 },
      { text: 'Having nutritious meals ready', value: 'meals-nutrition', order: 3 },
      { text: 'Managing visitors and boundaries', value: 'visitors-boundaries', order: 4 },
      { text: 'Balancing work and family time', value: 'work-family-balance', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Adoption',
    slug: 'adoption',
    icon: '🤗',
    description: 'Growing your family through adoption',
    categorySpecificQuestion: "What feels most important to manage during this transition?",
    questionOptions: [
      { text: 'Preparing the home environment', value: 'home-preparation', order: 1 },
      { text: 'Managing paperwork and appointments', value: 'paperwork-appointments', order: 2 },
      { text: 'Balancing work during the process', value: 'work-balance', order: 3 },
      { text: 'Helping other family members adjust', value: 'family-adjustment', order: 4 },
      { text: 'Taking care of daily needs while focused on adoption', value: 'daily-needs', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Divorce',
    slug: 'divorce',
    icon: '💔',
    description: 'Navigating separation and building a new life',
    categorySpecificQuestion: "What's your biggest daily priority right now?",
    questionOptions: [
      { text: 'Managing household tasks alone', value: 'household-management', order: 1 },
      { text: 'Coordinating schedules with children', value: 'child-coordination', order: 2 },
      { text: 'Handling legal and financial matters', value: 'legal-financial', order: 3 },
      { text: 'Maintaining work performance', value: 'work-performance', order: 4 },
      { text: 'Taking care of personal well-being', value: 'personal-wellbeing', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Sickness',
    slug: 'sickness',
    icon: '🏥',
    description: 'Managing health challenges and recovery',
    categorySpecificQuestion: "What's the hardest part of managing daily life right now?",
    questionOptions: [
      { text: 'Getting to medical appointments', value: 'medical-appointments', order: 1 },
      { text: 'Keeping up with household tasks', value: 'household-tasks', order: 2 },
      { text: 'Preparing healthy meals', value: 'healthy-meals', order: 3 },
      { text: 'Managing work responsibilities', value: 'work-responsibilities', order: 4 },
      { text: 'Caring for family members', value: 'family-care', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Loss of Income',
    slug: 'loss-of-income',
    icon: '💼',
    description: 'Navigating financial challenges and job transitions',
    categorySpecificQuestion: "What's your most pressing concern right now?",
    questionOptions: [
      { text: 'Managing essential household expenses', value: 'essential-expenses', order: 1 },
      { text: 'Maintaining daily routines for family', value: 'family-routines', order: 2 },
      { text: 'Finding time for job searching', value: 'job-searching', order: 3 },
      { text: 'Keeping up with home maintenance', value: 'home-maintenance', order: 4 },
      { text: 'Managing stress and staying positive', value: 'stress-management', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Moving',
    slug: 'moving',
    icon: '📦',
    description: 'Relocating to a new home or city',
    categorySpecificQuestion: "What part of moving feels most overwhelming?",
    questionOptions: [
      { text: 'Packing and organizing belongings', value: 'packing-organizing', order: 1 },
      { text: 'Coordinating the physical move', value: 'physical-move', order: 2 },
      { text: 'Managing work/family during transition', value: 'work-family-transition', order: 3 },
      { text: 'Setting up utilities and services', value: 'utilities-setup', order: 4 },
      { text: 'Cleaning old and new homes', value: 'home-cleaning', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Death',
    slug: 'death',
    icon: '🕊️',
    description: 'Grieving loss and managing life changes',
    categorySpecificQuestion: "What feels most difficult to manage right now?",
    questionOptions: [
      { text: 'Daily household tasks and maintenance', value: 'household-maintenance', order: 1 },
      { text: 'Handling arrangements and paperwork', value: 'arrangements-paperwork', order: 2 },
      { text: 'Taking care of family members', value: 'family-care', order: 3 },
      { text: 'Managing work and responsibilities', value: 'work-responsibilities', order: 4 },
      { text: 'Maintaining normal routines', value: 'normal-routines', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Wedding',
    slug: 'wedding',
    icon: '💒',
    description: 'Planning your special day and new life together',
    categorySpecificQuestion: "What aspect of wedding planning feels most overwhelming?",
    questionOptions: [
      { text: 'Coordinating vendors and timeline', value: 'vendor-coordination', order: 1 },
      { text: 'Managing guest logistics', value: 'guest-logistics', order: 2 },
      { text: 'Balancing work and planning', value: 'work-planning-balance', order: 3 },
      { text: 'Handling family expectations', value: 'family-expectations', order: 4 },
      { text: 'Managing wedding day details', value: 'wedding-day-details', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'New Job',
    slug: 'new-job',
    icon: '💼',
    description: 'Starting a new career or major job transition',
    categorySpecificQuestion: "What would help you most during this career transition?",
    questionOptions: [
      { text: 'Managing household tasks while adjusting', value: 'household-adjustment', order: 1 },
      { text: 'Preparing for the new role', value: 'role-preparation', order: 2 },
      { text: 'Organizing wardrobe and workspace', value: 'wardrobe-workspace', order: 3 },
      { text: 'Balancing family during transition', value: 'family-balance', order: 4 },
      { text: 'Managing stress and expectations', value: 'stress-expectations', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Retirement',
    slug: 'retirement',
    icon: '🌅',
    description: 'Transitioning to retirement and new lifestyle',
    categorySpecificQuestion: "What's your biggest priority as you transition to retirement?",
    questionOptions: [
      { text: 'Organizing and downsizing belongings', value: 'organizing-downsizing', order: 1 },
      { text: 'Planning health and wellness routines', value: 'health-wellness', order: 2 },
      { text: 'Managing financial and legal matters', value: 'financial-legal', order: 3 },
      { text: 'Creating new daily structures', value: 'daily-structures', order: 4 },
      { text: 'Pursuing hobbies and interests', value: 'hobbies-interests', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'New Home',
    slug: 'new-home',
    icon: '🏠',
    description: 'Settling into a new home and neighborhood',
    categorySpecificQuestion: "What would help you settle into your new home most comfortably?",
    questionOptions: [
      { text: 'Unpacking and organizing spaces', value: 'unpacking-organizing', order: 1 },
      { text: 'Setting up utilities and services', value: 'utilities-services', order: 2 },
      { text: 'Deep cleaning and home preparation', value: 'cleaning-preparation', order: 3 },
      { text: 'Finding local services and connections', value: 'local-connections', order: 4 },
      { text: 'Home improvement and decorating', value: 'home-improvement', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Recovery',
    slug: 'recovery',
    icon: '🌱',
    description: 'Healing from surgery, injury, or addiction',
    categorySpecificQuestion: "What support would help you focus most on your recovery?",
    questionOptions: [
      { text: 'Transportation to appointments', value: 'transportation-appointments', order: 1 },
      { text: 'Meal preparation and nutrition', value: 'meal-nutrition', order: 2 },
      { text: 'Light household maintenance', value: 'household-maintenance', order: 3 },
      { text: 'Emotional support and counseling', value: 'emotional-support', order: 4 },
      { text: 'Physical therapy and wellness', value: 'physical-wellness', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Caregiving',
    slug: 'caregiving',
    icon: '🫶',
    description: 'Caring for an aging parent or family member',
    categorySpecificQuestion: "What aspect of caregiving feels most overwhelming?",
    questionOptions: [
      { text: 'Coordinating medical care', value: 'medical-coordination', order: 1 },
      { text: 'Managing daily caregiving tasks', value: 'daily-caregiving', order: 2 },
      { text: 'Balancing caregiving with work/family', value: 'caregiving-balance', order: 3 },
      { text: 'Handling household tasks for two homes', value: 'two-household-management', order: 4 },
      { text: 'Managing my own self-care', value: 'caregiver-selfcare', order: 5 }
    ],
    isActive: true
  },
  {
    name: 'Empty Nest',
    slug: 'empty-nest',
    icon: '🪺',
    description: 'Adjusting to life after children leave home',
    categorySpecificQuestion: "What would help you most during this transition?",
    questionOptions: [
      { text: 'Reorganizing and downsizing the home', value: 'reorganizing-downsizing', order: 1 },
      { text: 'Exploring new interests and hobbies', value: 'new-interests', order: 2 },
      { text: 'Reconnecting with spouse/partner', value: 'relationship-reconnection', order: 3 },
      { text: 'Managing household differently', value: 'household-adjustment', order: 4 },
      { text: 'Finding new purpose and routine', value: 'purpose-routine', order: 5 }
    ],
    isActive: true
  }
];

const seedCategories = async (standalone = true) => {
  let shouldCloseConnection = false;

  try {
    // Determine if we need to manage the connection
    const isConnected = mongoose.connection.readyState === 1;
    
    // Only connect if we're running standalone or if mongoose isn't already connected
    if (!isConnected) {
      console.log('🔗 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Connected to MongoDB successfully');
      shouldCloseConnection = standalone; // Only close if we opened it and running standalone
    }

    console.log('🗑️ Clearing existing categories...');
    const deleteResult = await Category.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing categories`);

    console.log('📝 Inserting new categories...');
    const insertResult = await Category.insertMany(categories);
    console.log(`✅ Successfully inserted ${insertResult.length} categories:`);
    
    insertResult.forEach(category => {
      console.log(`  ✓ ${category.icon} ${category.name} (${category.slug})`);
    });

    console.log('\n🎉 Categories seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    console.error('📍 Stack trace:', error.stack);
    
    if (standalone) {
      process.exit(1);
    } else {
      throw error; // Re-throw for the calling function to handle
    }
  } finally {
    if (shouldCloseConnection) {
      await mongoose.connection.close();
      console.log('\n🔌 Database connection closed');
      if (standalone) {
        process.exit(0);
      }
    }
  }
};

// Handle process termination gracefully (only when running standalone)
if (require.main === module) {
  process.on('SIGINT', async () => {
    console.log('\n⚠️  Process interrupted. Closing database connection...');
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Error closing connection:', err);
    }
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('\n⚠️  Process terminated. Closing database connection...');
    try {
      await mongoose.connection.close();
    } catch (err) {
      console.error('Error closing connection:', err);
    }
    process.exit(0);
  });

  // Run the seeding function in standalone mode
  seedCategories(true);
}

module.exports = { categories, seedCategories };
