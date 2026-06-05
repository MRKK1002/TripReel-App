import axios from 'axios';

// Configuration - Perplexity API details
const PERPLEXITY_API_KEY = process.env.EXPO_PUBLIC_PERPLEXITY_API_KEY || '';
const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

// Helper to call Perplexity chat completion endpoint
const callPerplexityAI = async (messages) => {
  try {
    console.log('Calling Perplexity API with messages:', JSON.stringify(messages, null, 2));
    
    const response = await axios.post(PERPLEXITY_API_URL, {
      model: 'sonar-pro',
      messages,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      timeout: 30000,
    });
    
    console.log('Perplexity API response received');
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Perplexity API error details:', error.response?.data || error.message);
    throw error;
  }
};

// Build prompt for travel recommendations
const buildRecommendationPrompt = (userPreferences) => {
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
  return `Create a ${userPreferences.duration}-day itinerary for ${userPreferences.destination || 'Thailand'} based on:
- Package: ${selectedPackage.title}
- Dates: ${userPreferences.departureDate.toDateString()}
- Travelers: ${userPreferences.people} people
- Interests: ${userPreferences.places.join(', ') || 'Not specified'}
- Budget: $${userPreferences.budget} per person

Provide JSON response with: title, summary, days (array with dayNumber, activities), essentials (array), localTips (array).`;
};

// Function to parse JSON from AI response
const parseAIResponse = (responseText) => {
  try {
    console.log('Raw AI response:', responseText);
    
    // Extract JSON from the response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Error parsing AI response:', error, 'Response text:', responseText);
    
    // Return a fallback structure if parsing fails
    return {
      summary: "We've created personalized recommendations based on your preferences.",
      personalizedTips: [
        "Book accommodations in advance during peak season",
        "Try local street food for authentic experiences",
        "Carry cash for local markets and small vendors"
      ],
      hiddenGems: [
        {
          name: "Local Market Experience",
          location: "Various locations",
          description: "Explore authentic local markets away from tourist areas"
        }
      ],
      seasonalConsiderations: "Check weather conditions for your travel dates"
    };
  }
};

// Function to get AI travel recommendations
export const getTravelRecommendations = async (userPreferences) => {
  try {
    if (!PERPLEXITY_API_KEY) {
      throw new Error('Perplexity API key not configured');
    }

    const prompt = buildRecommendationPrompt(userPreferences);
    const messages = [
      {
        role: 'system',
        content: 'You are a travel expert specializing in Thailand tourism. Provide detailed, personalized recommendations in valid JSON format without any additional text.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];
    
    const response = await callPerplexityAI(messages);
    return parseAIResponse(response);
  } catch (error) {
    console.error('Error getting travel recommendations:', error);
    
    // Return fallback recommendations
    return {
      summary: `Based on your preferences for ${userPreferences.destination || 'Thailand'}, we've curated these amazing experiences just for you. Your ${userPreferences.duration}-day trip for ${userPreferences.people} people with a ${userPreferences.mood} focus is perfect for exploring the best of what Thailand has to offer.`,
      personalizedTips: [
        `Visit ${userPreferences.destination || 'Bangkok'} during the early morning to avoid crowds`,
        `Try the local street food for an authentic experience`,
        `Book temple visits in the cooler parts of the day`,
      ],
      hiddenGems: [
        {
          name: 'Secret Beach',
          location: 'Near Phi Phi Islands',
          description: 'A secluded beach only accessible by boat during low tide'
        },
        {
          name: 'Local Market Experience',
          location: 'Chiang Mai',
          description: 'Authentic market where locals shop, not tourists'
        }
      ],
      seasonalConsiderations: 'Thailand has a tropical climate with warm weather year-round. The cool season (November-February) is the most pleasant time to visit.'
    };
  }
};

// Function to get personalized itinerary
export const getPersonalizedItinerary = async (selectedPackage, userPreferences) => {
  try {
    if (!PERPLEXITY_API_KEY) {
      throw new Error('Perplexity API key not configured');
    }

    const prompt = buildItineraryPrompt(selectedPackage, userPreferences);
    const messages = [
      {
        role: 'system',
        content: 'You are a travel planner specializing in creating detailed itineraries for Thailand. Provide comprehensive day-by-day plans in valid JSON format without any additional text.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];
    
    const response = await callPerplexityAI(messages);
    return parseAIResponse(response);
  } catch (error) {
    console.error('Error getting personalized itinerary:', error);
    
    // Return fallback itinerary
    return getFallbackItinerary(selectedPackage, userPreferences);
  }
};

// Fallback itinerary generator
const getFallbackItinerary = (pkg, preferences) => {
  return {
    title: `${preferences.duration}-Day ${preferences.destination} Adventure`,
    summary: `Your personalized ${preferences.duration}-day journey through ${preferences.destination || 'Thailand'} designed for ${preferences.people} people with a focus on ${preferences.mood} experiences.`,
    days: Array.from({ length: preferences.duration }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}: Exploring ${preferences.destination || 'Thailand'}`,
      activities: [
        {
          time: '09:00 AM',
          title: 'Morning Adventure',
          description: 'Explore local attractions and cultural sites'
        },
        {
          time: '01:00 PM',
          title: 'Lunch at Local Restaurant',
          description: 'Authentic Thai cuisine experience'
        },
        {
          time: '03:00 PM',
          title: 'Afternoon Exploration',
          description: 'Visit famous landmarks and hidden gems'
        },
        {
          time: '07:00 PM',
          title: 'Dinner & Evening Activities',
          description: 'Enjoy local nightlife and culinary delights'
        }
      ]
    })),
    essentials: [
      'Comfortable walking shoes',
      'Light clothing for warm weather',
      'Sun protection (hat, sunscreen)',
      'Local currency for markets',
      'Camera to capture memories'
    ],
    localTips: [
      'Remove shoes before entering temples',
      'Dress modestly when visiting religious sites',
      'Bargain politely at markets',
      'Try street food from busy vendors'
    ]
  };
};
