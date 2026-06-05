// import axios from 'axios';

// const DEEPSEEK_API_KEY = 'sk-8e354c064bc84ed0a10c25b3f492fe9b'; // Replace with your actual API key
// const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Check DeepSeek's actual API endpoint

// // Create axios instance
// const deepSeekApi = axios.create({
//   baseURL: DEEPSEEK_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
//   }
// });

// // Function to get AI recommendations based on user preferences
// export const getTravelRecommendations = async (userPreferences) => {
//   try {
//     const prompt = `
//       Based on the following travel preferences, provide personalized travel recommendations for Thailand:
//       - Destination: ${userPreferences.destination}
//       - Number of people: ${userPreferences.people}
//       - Interests: ${userPreferences.places.join(', ')}
//       - Budget: $${userPreferences.budget} per person
//       - Travel mood: ${userPreferences.mood}

//       Please respond with a JSON object containing:
//       {
//         "recommendations": [
//           {
//             "category": "category name",
//             "reason": "personalized reason for recommendation",
//             "suggestedActivities": ["activity1", "activity2", "activity3"]
//           }
//         ],
//         "travelTips": ["tip1", "tip2", "tip3"],
//         "budgetAdvice": "advice on managing the budget"
//       }
//     `;

//     const response = await deepSeekApi.post('', {
//       model: 'deepseek-chat', // Check the correct model name
//       messages: [
//         {
//           role: 'user',
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 1000
//     });

//     // Parse the AI response
//     const content = response.data.choices[0].message.content;

//     // Extract JSON from the response (AI might add text around the JSON)
//     const jsonMatch = content.match(/\{[\s\S]*\}/);
//     if (jsonMatch) {
//       return JSON.parse(jsonMatch[0]);
//     }

//     return {
//       recommendations: [],
//       travelTips: [],
//       budgetAdvice: "No specific advice available."
//     };
//   } catch (error) {
//     console.error('Error calling DeepSeek API:', error);
//     throw new Error('Failed to get travel recommendations');
//   }
// };

// // Function to get personalized itinerary suggestions
// export const getPersonalizedItinerary = async (selectedPackage, userPreferences) => {
//   try {
//     const prompt = `
//       Create a personalized itinerary for a trip to Thailand based on:
//       Package: ${selectedPackage.title}
//       Destination: ${userPreferences.destination}
//       Number of people: ${userPreferences.people}
//       Interests: ${userPreferences.places.join(', ')}
//       Budget: $${userPreferences.budget} per person
//       Travel mood: ${userPreferences.mood}

//       Please provide a day-by-day itinerary with suggestions for activities, dining, and transportation.
//       Respond with a JSON object containing:
//       {
//         "itinerary": [
//           {
//             "day": 1,
//             "theme": "day theme",
//             "morning": "morning activity",
//             "afternoon": "afternoon activity",
//             "evening": "evening activity",
//             "dining": "dining suggestion",
//             "budget": estimated cost for the day
//           }
//         ],
//         "packingTips": ["tip1", "tip2"],
//         "culturalNotes": ["note1", "note2"]
//       }
//     `;

//     const response = await deepSeekApi.post('', {
//       model: 'deepseek-chat',
//       messages: [
//         {
//           role: 'user',
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 1500
//     });

//     const content = response.data.choices[0].message.content;
//     const jsonMatch = content.match(/\{[\s\S]*\}/);

//     if (jsonMatch) {
//       return JSON.parse(jsonMatch[0]);
//     }

//     return {
//       itinerary: [],
//       packingTips: [],
//       culturalNotes: []
//     };
//   } catch (error) {
//     console.error('Error getting itinerary:', error);
//     throw new Error('Failed to generate itinerary');
//   }
// };

// // services/deepseekApi.js
// import axios from 'axios';

// // Configuration - Update these with your actual DeepSeek API details
// const DEEPSEEK_API_KEY = 'sk-8e354c064bc84ed0a10c25b3f492fe9b';
// const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'; // Verify the correct endpoint

// // Create axios instance
// const deepSeekApi = axios.create({
//   baseURL: DEEPSEEK_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
//   },
//   timeout: 30000, // 30 second timeout
// });

// // Fallback recommendations in case API fails
// const getFallbackRecommendations = (userPreferences) => {
//   return {
//     recommendations: [
//       {
//         category: "Personalized Adventure",
//         reason: `Based on your interest in ${userPreferences.places.join(', ') || 'exploration'} and ${userPreferences.mood || 'adventure'} mood`,
//         suggestedActivities: [
//           "Visit local markets for authentic experiences",
//           "Try traditional Thai cuisine",
//           "Explore both popular and hidden gems"
//         ]
//       }
//     ],
//     travelTips: [
//       "Carry cash for local markets and street food",
//       "Dress modestly when visiting temples",
//       "Stay hydrated in Thailand's tropical climate"
//     ],
//     budgetAdvice: `With your budget of $${userPreferences.budget}, focus on balancing experiences with comfort. Consider allocating funds for unique activities.`
//   };
// };

// // Function to get AI recommendations
// export const getTravelRecommendations = async (userPreferences) => {
//   // If no API key is set, use fallback
//   if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
//     return getFallbackRecommendations(userPreferences);
//   }

//   try {
//     const prompt = `
//       As a travel expert, provide personalized Thailand travel recommendations based on:
//       - Destination: ${userPreferences.destination || 'Not specified'}
//       - Travelers: ${userPreferences.people} people
//       - Interests: ${userPreferences.places.join(', ') || 'General exploration'}
//       - Budget: $${userPreferences.budget} per person
//       - Travel style: ${userPreferences.mood || 'Flexible'}

//       Respond with a valid JSON object containing:
//       {
//         "recommendations": [
//           {
//             "category": "category name",
//             "reason": "personalized reason",
//             "suggestedActivities": ["activity1", "activity2", "activity3"]
//           }
//         ],
//         "travelTips": ["tip1", "tip2", "tip3"],
//         "budgetAdvice": "budget guidance"
//       }
//     `;

//     const response = await deepSeekApi.post('', {
//       model: 'deepseek-chat',
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.7,
//       max_tokens: 1000
//     });

//     // Extract and parse JSON from response
//     try {
//       const content = response.data.choices[0].message.content;
//       const jsonMatch = content.match(/\{[\s\S]*\}/);

//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       } else {
//         console.warn('No JSON found in API response, using fallback');
//         return getFallbackRecommendations(userPreferences);
//       }
//     } catch (parseError) {
//       console.warn('Error parsing API response:', parseError);
//       return getFallbackRecommendations(userPreferences);
//     }
//   } catch (error) {
//     console.error('DeepSeek API Error:', error.response?.status, error.message);

//     // Handle specific error cases
//     if (error.response?.status === 402) {
//       console.warn('DeepSeek API payment required - using fallback recommendations');
//     } else if (error.response?.status === 401) {
//       console.warn('DeepSeek API unauthorized - check your API key');
//     }

//     return getFallbackRecommendations(userPreferences);
//   }
// };

// // Fallback itinerary generator
// const getFallbackItinerary = (selectedPackage, userPreferences) => {
//   const days = selectedPackage.id.includes('4D') ? 4 : 3; // Simple logic based on package ID
//   const itinerary = [];

//   for (let i = 1; i <= days; i++) {
//     itinerary.push({
//       day: i,
//       theme: i === 1 ? 'Arrival & Exploration' : i === days ? 'Departure & Last Memories' : 'Full Day Adventure',
//       morning: 'Explore local attractions and enjoy breakfast',
//       afternoon: 'Cultural experiences or adventure activities',
//       evening: 'Relax and enjoy local cuisine',
//       dining: 'Traditional Thai restaurant',
//       budget: Math.round(userPreferences.budget / days * 0.4) // 40% of daily budget
//     });
//   }

//   return {
//     itinerary,
//     packingTips: [
//       'Lightweight clothing for warm weather',
//       'Comfortable walking shoes',
//       'Swimwear if visiting beaches',
//       'Sun protection (hat, sunscreen)'
//     ],
//     culturalNotes: [
//       'Remove shoes before entering temples',
//       'Dress modestly in religious sites',
//       'Be respectful of local customs and traditions'
//     ]
//   };
// };

// // Function to get personalized itinerary
// export const getPersonalizedItinerary = async (selectedPackage, userPreferences) => {
//   // If no API key is set, use fallback
//   if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
//     return getFallbackItinerary(selectedPackage, userPreferences);
//   }

//   try {
//     const prompt = `
//       Create a ${selectedPackage.includes?.[0]?.replace('N/', '') || '3'}-day Thailand itinerary for:
//       Package: ${selectedPackage.title}
//       Destination: ${userPreferences.destination}
//       Travelers: ${userPreferences.people} people
//       Interests: ${userPreferences.places.join(', ')}
//       Budget: $${userPreferences.budget} per person
//       Style: ${userPreferences.mood}

//       Respond with valid JSON containing:
//       {
//         "itinerary": [
//           {
//             "day": 1,
//             "theme": "day theme",
//             "morning": "activity",
//             "afternoon": "activity",
//             "evening": "activity",
//             "dining": "suggestion",
//             "budget": estimated_cost
//           }
//         ],
//         "packingTips": ["tip1", "tip2"],
//         "culturalNotes": ["note1", "note2"]
//       }
//     `;

//     const response = await deepSeekApi.post('', {
//       model: 'deepseek-chat',
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.7,
//       max_tokens: 1500
//     });

//     // Extract and parse JSON from response
//     try {
//       const content = response.data.choices[0].message.content;
//       const jsonMatch = content.match(/\{[\s\S]*\}/);

//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       } else {
//         console.warn('No JSON found in itinerary response, using fallback');
//         return getFallbackItinerary(selectedPackage, userPreferences);
//       }
//     } catch (parseError) {
//       console.warn('Error parsing itinerary response:', parseError);
//       return getFallbackItinerary(selectedPackage, userPreferences);
//     }
//   } catch (error) {
//     console.error('DeepSeek Itinerary API Error:', error.response?.status, error.message);
//     return getFallbackItinerary(selectedPackage, userPreferences);
//   }
// };

// // services/deepseekApi.js
// import axios from 'axios';

// // Configuration - Update these with your actual DeepSeek API details
// const DEEPSEEK_API_KEY = 'sk-8e354c064bc84ed0a10c25b3f492fe9b';
// const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'; // Verify the correct endpoint

// // Create axios instance
// const deepSeekApi = axios.create({
//   baseURL: DEEPSEEK_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
//   },
//   timeout: 30000, // 30 second timeout
// });

// // Fallback recommendations (no API needed)
// const getFallbackRecommendations = (userPreferences) => {
//   return {
//     recommendations: [
//       {
//         category: "Personalized Adventure",
//         reason: `Based on your interest in ${userPreferences.places.join(', ') || 'exploration'} and ${userPreferences.mood || 'adventure'} mood`,
//         suggestedActivities: [
//           "Visit local markets for authentic experiences",
//           "Try traditional Thai cuisine",
//           "Explore both popular and hidden gems"
//         ]
//       }
//     ],
//     travelTips: [
//       "Carry cash for local markets and street food",
//       "Dress modestly when visiting temples",
//       "Stay hydrated in Thailand's tropical climate"
//     ],
//     budgetAdvice: `With your budget of $${userPreferences.budget}, focus on balancing experiences with comfort. Consider allocating funds for unique activities.`
//   };
// };

// // Function to get AI recommendations
// export const getTravelRecommendations = async (userPreferences) => {
//   return getFallbackRecommendations(userPreferences);
// };

// // Fallback itinerary generator
// const getFallbackItinerary = (selectedPackage, userPreferences) => {
//   const days = selectedPackage.id.includes('4D') ? 4 : 3; // Simple logic based on package ID
//   const itinerary = [];

//   for (let i = 1; i <= days; i++) {
//     itinerary.push({
//       day: i,
//       theme: i === 1 ? 'Arrival & Exploration' : i === days ? 'Departure & Last Memories' : 'Full Day Adventure',
//       morning: 'Explore local attractions and enjoy breakfast',
//       afternoon: 'Cultural experiences or adventure activities',
//       evening: 'Relax and enjoy local cuisine',
//       dining: 'Traditional Thai restaurant',
//       budget: Math.round(userPreferences.budget / days * 0.4) // 40% of daily budget
//     });
//   }

//   return {
//     itinerary,
//     packingTips: [
//       'Lightweight clothing for warm weather',
//       'Comfortable walking shoes',
//       'Swimwear if visiting beaches',
//       'Sun protection (hat, sunscreen)'
//     ],
//     culturalNotes: [
//       'Remove shoes before entering temples',
//       'Dress modestly in religious sites',
//       'Be respectful of local customs and traditions'
//     ]
//   };
// };

// // Function to get personalized itinerary
// export const getPersonalizedItinerary = async (selectedPackage, userPreferences) => {
//   return getFallbackItinerary(selectedPackage, userPreferences);
// };

// // services/perplexityApi.js
// import axios from 'axios';

// // Configuration - Perplexity API details
// const PERPLEXITY_API_KEY = '<YOUR_PERPLEXITY_API_KEY>';
// const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// // Create axios instance for Perplexity API
// const perplexityApi = axios.create({
//   baseURL: PERPLEXITY_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
//   },
//   timeout: 30000, // 30 second timeout
// });

// // Helper to call Perplexity chat completion endpoint
// const callPerplexityAI = async (messages) => {
//   try {
//     const response = await perplexityApi.post('', {
//       model: 'sonar-pro', // or your preferred Perplexity model
//       messages,
//     });
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('Perplexity API error:', error);
//     throw error;
//   }
// };

// // Build prompt for travel recommendations
// const buildRecommendationPrompt = (userPreferences) => {
//   return [
//     {
//       role: 'system',
//       content: 'You are a travel assistant who provides personalized travel recommendations.'
//     },
//     {
//       role: 'user',
//       content: `Provide travel recommendations based on user preferences: places - ${userPreferences.places.join(', ')}, mood - ${userPreferences.mood}, budget - $${userPreferences.budget}.`
//     }
//   ];
// };

// // Build prompt for itinerary generation
// const buildItineraryPrompt = (selectedPackage, userPreferences) => {
//   return [
//     {
//       role: 'system',
//       content: 'You are a travel planner who creates personalized itineraries.'
//     },
//     {
//       role: 'user',
//       content: `Create a detailed ${selectedPackage.id.includes('4D') ? '4-day' : '3-day'} itinerary for a travel package named ${selectedPackage.id} considering user preferences: places - ${userPreferences.places.join(', ')}, mood - ${userPreferences.mood}, budget - $${userPreferences.budget}.`
//     }
//   ];
// };

// // Function to get AI travel recommendations
// export const getTravelRecommendations = async (userPreferences) => {
//   const messages = buildRecommendationPrompt(userPreferences);
//   return await callPerplexityAI(messages);
// };

// // Function to get personalized itinerary
// export const getPersonalizedItinerary = async (selectedPackage, userPreferences) => {
//   const messages = buildItineraryPrompt(selectedPackage, userPreferences);
//   return await callPerplexityAI(messages);
// };

import axios from 'axios';

// Configuration - Perplexity API details
const PERPLEXITY_API_KEY = process.env.EXPO_PUBLIC_PERPLEXITY_API_KEY || '';
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Helper to call Perplexity chat completion endpoint
const callPerplexityAI = async messages => {
  try {
    const response = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: 'sonar-pro',
        messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        },
        timeout: 30000,
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};

// Build prompt for travel recommendations
const buildRecommendationPrompt = userPreferences => {
  return `As a Thailand travel expert, create personalized recommendations based on:
- Destination: ${userPreferences.destination || 'Not specified'}
- Dates: ${userPreferences.departureDate.toDateString()}
- Duration: ${userPreferences.duration} days
- Travelers: ${userPreferences.people} people
- Interests: ${userPreferences.places.join(', ') || 'Not specified'}
- Budget: $${userPreferences.budget} per person
- Travel Style: ${userPreferences.travelStyle || 'Not specified'}
- Accommodation: ${userPreferences.accommodation || 'Not specified'}
- Mood: ${userPreferences.mood || 'Not specified'}

Provide a JSON response with: summary, personalizedTips (array), hiddenGems (array of objects with name, location, description), seasonalConsiderations.`;
};

// Build prompt for itinerary generation
const buildItineraryPrompt = (selectedPackage, userPreferences) => {
  return `Create a ${userPreferences.duration}-day itinerary for ${
    userPreferences.destination || 'Thailand'
  } based on:
- Package: ${selectedPackage.title}
- Dates: ${userPreferences.departureDate.toDateString()}
- Travelers: ${userPreferences.people} people
- Interests: ${userPreferences.places.join(', ') || 'Not specified'}
- Budget: $${userPreferences.budget} per person

Provide JSON response with: title, summary, days (array with dayNumber, activities), essentials (array), localTips (array).`;
};

// Function to parse JSON from AI response
const parseAIResponse = responseText => {
  try {
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch {
    // Return a fallback structure if parsing fails
    return {
      summary:
        "We've created personalized recommendations based on your preferences.",
      personalizedTips: [
        'Book accommodations in advance during peak season',
        'Try local street food for authentic experiences',
        'Carry cash for local markets and small vendors',
      ],
      hiddenGems: [
        {
          name: 'Local Market Experience',
          location: 'Various locations',
          description:
            'Explore authentic local markets away from tourist areas',
        },
      ],
      seasonalConsiderations: 'Check weather conditions for your travel dates',
    };
  }
};

// Function to get AI travel recommendations
export const getTravelRecommendations = async userPreferences => {
  try {
    if (!PERPLEXITY_API_KEY) {
      throw new Error('Perplexity API key not configured');
    }

    const prompt = buildRecommendationPrompt(userPreferences);
    const messages = [
      {
        role: 'system',
        content:
          'You are a travel expert specializing in Thailand tourism. Provide detailed, personalized recommendations in valid JSON format without any additional text.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await callPerplexityAI(messages);
    return parseAIResponse(response);
  } catch {
    // Return fallback recommendations
    return {
      summary: `Based on your preferences for ${
        userPreferences.destination || 'Thailand'
      }, we've curated these amazing experiences just for you. Your ${
        userPreferences.duration
      }-day trip for ${userPreferences.people} people with a ${
        userPreferences.mood
      } focus is perfect for exploring the best of what Thailand has to offer.`,
      personalizedTips: [
        `Visit ${
          userPreferences.destination || 'Bangkok'
        } during the early morning to avoid crowds`,
        `Try the local street food for an authentic experience`,
        `Book temple visits in the cooler parts of the day`,
      ],
      hiddenGems: [
        {
          name: 'Secret Beach',
          location: 'Near Phi Phi Islands',
          description:
            'A secluded beach only accessible by boat during low tide',
        },
        {
          name: 'Local Market Experience',
          location: 'Chiang Mai',
          description: 'Authentic market where locals shop, not tourists',
        },
      ],
      seasonalConsiderations:
        'Thailand has a tropical climate with warm weather year-round. The cool season (November-February) is the most pleasant time to visit.',
    };
  }
};

// Function to get personalized itinerary
export const getPersonalizedItinerary = async (
  selectedPackage,
  userPreferences,
) => {
  try {
    if (!PERPLEXITY_API_KEY) {
      throw new Error('Perplexity API key not configured');
    }

    const prompt = buildItineraryPrompt(selectedPackage, userPreferences);
    const messages = [
      {
        role: 'system',
        content:
          'You are a travel planner specializing in creating detailed itineraries for Thailand. Provide comprehensive day-by-day plans in valid JSON format without any additional text.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    const response = await callPerplexityAI(messages);
    return parseAIResponse(response);
  } catch {
    // Return fallback itinerary
    return getFallbackItinerary(selectedPackage, userPreferences);
  }
};

// Fallback itinerary generator
const getFallbackItinerary = (pkg, preferences) => {
  return {
    title: `${preferences.duration}-Day ${preferences.destination} Adventure`,
    summary: `Your personalized ${preferences.duration}-day journey through ${
      preferences.destination || 'Thailand'
    } designed for ${preferences.people} people with a focus on ${
      preferences.mood
    } experiences.`,
    days: Array.from({ length: preferences.duration }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Exploring ${preferences.destination || 'Thailand'}`,
      activities: [
        {
          time: '09:00 AM',
          title: 'Morning Adventure',
          description: 'Explore local attractions and cultural sites',
        },
        {
          time: '01:00 PM',
          title: 'Lunch at Local Restaurant',
          description: 'Authentic Thai cuisine experience',
        },
        {
          time: '03:00 PM',
          title: 'Afternoon Exploration',
          description: 'Visit famous landmarks and hidden gems',
        },
        {
          time: '07:00 PM',
          title: 'Dinner & Evening Activities',
          description: 'Enjoy local nightlife and culinary delights',
        },
      ],
    })),
    essentials: [
      'Comfortable walking shoes',
      'Light clothing for warm weather',
      'Sun protection (hat, sunscreen)',
      'Local currency for markets',
      'Camera to capture memories',
    ],
    localTips: [
      'Remove shoes before entering temples',
      'Dress modestly when visiting religious sites',
      'Bargain politely at markets',
      'Try street food from busy vendors',
    ],
  };
};
