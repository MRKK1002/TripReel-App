// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import { ArrowLeftIcon, CalendarIcon } from 'react-native-heroicons/outline';

// const ItineraryScreen = ({ route, navigation }) => {
//   const { itinerary, package: pkg, userPreferences } = route.params;

//   return (
//     <SafeAreaView className="flex-1 bg-blue-50">
//       <View className="px-4 py-4 mt-16 bg-white">
//         <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
//           <ArrowLeftIcon size={24} color="#4F46E5" />
//           <Text className="w-16 ml-2 text-indigo-600">Back</Text>
//         </TouchableOpacity>
        
//         <View className="items-center mt-4">
//           <CalendarIcon size={32} color="#4F46E5" />
//           <Text className="mt-2 text-2xl font-bold text-center text-gray-800">Personalized Itinerary</Text>
//           <Text className="text-center text-gray-600">{pkg.title}</Text>
//         </View>
//       </View>

//       <ScrollView className="flex-1 p-4 mb-20">
//         {/* Itinerary Days */}
//         {itinerary?.itinerary?.map((day, index) => (
//           <View key={index} className="p-4 mb-4 bg-white rounded-lg shadow-sm">
//             <Text className="text-xl font-semibold text-indigo-600">Day {day.day}: {day.theme}</Text>
            
//             <View className="mt-3">
//               <Text className="font-medium text-gray-800">Morning:</Text>
//               <Text className="mt-1 text-gray-700">{day.morning}</Text>
//             </View>
            
//             <View className="mt-3">
//               <Text className="font-medium text-gray-800">Afternoon:</Text>
//               <Text className="mt-1 text-gray-700">{day.afternoon}</Text>
//             </View>
            
//             <View className="mt-3">
//               <Text className="font-medium text-gray-800">Evening:</Text>
//               <Text className="mt-1 text-gray-700">{day.evening}</Text>
//             </View>
            
//             <View className="mt-3">
//               <Text className="font-medium text-gray-800">Dining:</Text>
//               <Text className="mt-1 text-gray-700">{day.dining}</Text>
//             </View>
            
//             <View className="mt-3">
//               <Text className="font-medium text-gray-800">Estimated Cost: ${day.budget}</Text>
//             </View>
//           </View>
//         ))}

//         {/* Packing Tips */}
//         {itinerary?.packingTips && itinerary?.packingTips.length > 0 && (
//           <View className="p-4 mb-4 bg-white rounded-lg shadow-sm">
//             <Text className="text-xl font-semibold text-indigo-600">Packing Tips</Text>
//             {itinerary?.packingTips?.map((tip, index) => (
//               <View key={index} className="flex-row items-start mt-2">
//                 <Text className="mr-2 text-indigo-600">•</Text>
//                 <Text className="flex-1 text-gray-700">{tip}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Cultural Notes */}
//         {itinerary.culturalNotes && itinerary.culturalNotes.length > 0 && (
//           <View className="p-4 mb-4 bg-white rounded-lg shadow-sm">
//             <Text className="text-xl font-semibold text-indigo-600">Cultural Notes</Text>
//             {itinerary?.culturalNotes?.map((note, index) => (
//               <View key={index} className="flex-row items-start mt-2">
//                 <Text className="mr-2 text-indigo-600">•</Text>
//                 <Text className="flex-1 text-gray-700">{note}</Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ItineraryScreen;

























// import React from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
// } from 'react-native';
// import { ArrowLeftIcon, SparklesIcon, MapPinIcon, ClockIcon, UserGroupIcon, CurrencyDollarIcon } from 'react-native-heroicons/outline';

// const AIRecommendationsScreen = ({ route, navigation }) => {
//   const { recommendations, userPreferences } = route.params || {};

//   // Safe data access with fallbacks
//   const safeRecommendations = recommendations || {};
//   const safePersonalizedTips = safeRecommendations.personalizedTips || [
//     'Book accommodations in advance during peak season',
//     'Try local street food for authentic experiences',
//     'Carry cash for local markets and small vendors'
//   ];
//   const safeHiddenGems = safeRecommendations.hiddenGems || [
//     {
//       name: "Local Market Experience",
//       location: "Various locations",
//       description: "Explore authentic local markets away from tourist areas"
//     }
//   ];
//   const safeSeasonalConsiderations = safeRecommendations.seasonalConsiderations || 
//     'Check weather conditions for your travel dates';

//   return (
//     <SafeAreaView className="flex-1 bg-blue-50">
//       {/* Header */}
//       <View className="px-4 py-4 bg-white">
//         <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
//           <ArrowLeftIcon size={24} color="#4F46E5" />
//           <Text className="ml-2 text-indigo-600">Back</Text>
//         </TouchableOpacity>
        
//         <View className="items-center mt-4">
//           <SparklesIcon size={32} color="#4F46E5" />
//           <Text className="mt-2 text-2xl font-bold text-center text-gray-800">
//             AI-Powered Recommendations
//           </Text>
//           <Text className="text-center text-gray-600">
//             Personalized for your trip to {userPreferences?.destination || 'Thailand'}
//           </Text>
//         </View>
//       </View>

//       <ScrollView className="flex-1 p-4 mb-20">
//         {/* User Preferences Summary */}
//         {userPreferences && (
//           <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//             <Text className="mb-3 text-xl font-semibold text-indigo-600">Your Trip Details</Text>
            
//             <View className="flex-row items-center mb-2">
//               <MapPinIcon size={20} color="#6B7280" />
//               <Text className="ml-2 text-gray-700">{userPreferences.destination || 'Thailand'}</Text>
//             </View>
            
//             <View className="flex-row items-center mb-2">
//               <ClockIcon size={20} color="#6B7280" />
//               <Text className="ml-2 text-gray-700">{userPreferences.duration} days</Text>
//             </View>
            
//             <View className="flex-row items-center mb-2">
//               <UserGroupIcon size={20} color="#6B7280" />
//               <Text className="ml-2 text-gray-700">{userPreferences.people} people</Text>
//             </View>
            
//             <View className="flex-row items-center">
//               <CurrencyDollarIcon size={20} color="#6B7280" />
//               <Text className="ml-2 text-gray-700">${userPreferences.budget} per person</Text>
//             </View>
//           </View>
//         )}

//         {/* Trip Summary */}
//         {safeRecommendations.summary && (
//           <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//             <Text className="mb-3 text-xl font-semibold text-indigo-600">Trip Summary</Text>
//             <Text className="leading-6 text-gray-700">{safeRecommendations.summary}</Text>
//           </View>
//         )}

//         {/* Personalized Tips */}
//         <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//           <Text className="mb-3 text-xl font-semibold text-indigo-600">Personalized Tips</Text>
//           {safePersonalizedTips.map((tip, index) => (
//             <View key={index} className="flex-row items-start mb-3">
//               <View className="items-center justify-center w-6 h-6 mt-1 mr-3 bg-indigo-100 rounded-full">
//                 <Text className="text-sm font-bold text-indigo-600">{index + 1}</Text>
//               </View>
//               <Text className="flex-1 leading-6 text-gray-700">{tip}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Hidden Gems */}
//         <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//           <Text className="mb-3 text-xl font-semibold text-indigo-600">Hidden Gems</Text>
//           {safeHiddenGems.map((gem, index) => (
//             <View key={index} className="mb-4 last:mb-0">
//               <Text className="text-lg font-semibold text-indigo-700">{gem.name}</Text>
//               <Text className="mb-2 text-sm text-indigo-600">{gem.location}</Text>
//               <Text className="leading-6 text-gray-700">{gem.description}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Seasonal Considerations */}
//         {safeSeasonalConsiderations && (
//           <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//             <Text className="mb-3 text-xl font-semibold text-indigo-600">Seasonal Considerations</Text>
//             <Text className="leading-6 text-gray-700">{safeSeasonalConsiderations}</Text>
//           </View>
//         )}

//         {/* Additional Recommendations */}
//         <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//           <Text className="mb-3 text-xl font-semibold text-indigo-600">Travel Style Tips</Text>
//           <Text className="mb-3 leading-6 text-gray-700">
//             Based on your preference for {userPreferences?.travelStyle || 'comfortable'} travel:
//           </Text>
          
//           {userPreferences?.travelStyle === 'luxury' && (
//             <Text className="leading-6 text-gray-700">
//               Consider premium experiences like private tours, luxury spa treatments, 
//               and fine dining at award-winning restaurants. Look for hotels with 
//               exceptional service and amenities.
//             </Text>
//           )}
          
//           {userPreferences?.travelStyle === 'budget' && (
//             <Text className="leading-6 text-gray-700">
//               Focus on local experiences, street food, and public transportation. 
//               Many temples and cultural sites have free or low-cost entry times.
//             </Text>
//           )}
          
//           {(!userPreferences?.travelStyle || userPreferences?.travelStyle === 'mid-range') && (
//             <Text className="leading-6 text-gray-700">
//               Balance comfort and value by choosing well-located accommodations, 
//               mixing paid attractions with free experiences, and trying both 
//               local eateries and nicer restaurants.
//             </Text>
//           )}
//         </View>

//         {/* Accommodation Tips */}
//         {userPreferences?.accommodation && (
//           <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
//             <Text className="mb-3 text-xl font-semibold text-indigo-600">Accommodation Tips</Text>
//             <Text className="leading-6 text-gray-700">
//               For {userPreferences.accommodation} stays in {userPreferences.destination || 'Thailand'}, 
//               consider booking in advance during peak season and reading recent reviews 
//               to ensure quality.
//             </Text>
//           </View>
//         )}

//         {/* Call to Action */}
//         <TouchableOpacity 
//           className="p-4 mb-20 bg-indigo-600 rounded-lg"
//           onPress={() => navigation.navigate('MyTrip')}
//         >
//           <Text className="text-lg font-semibold text-center text-white">
//             Start Planning Your Itinerary
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AIRecommendationsScreen;



























import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  
} from 'react-native';
import { ArrowLeftIcon, CalendarIcon, MapPinIcon, ClockIcon, UserGroupIcon, CurrencyDollarIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItineraryScreen = ({ route, navigation }) => {
  const { itinerary, userPreferences } = route.params || {};

  // Safe data access with fallbacks
  const safeItinerary = itinerary || {};
  const safeDays = safeItinerary.days || [];
  const safeEssentials = safeItinerary.essentials || [
    'Comfortable walking shoes',
    'Light clothing for warm weather',
    'Sun protection (hat, sunscreen)',
    'Local currency for markets',
    'Camera to capture memories'
  ];
  const safeLocalTips = safeItinerary.localTips || [
    'Remove shoes before entering temples',
    'Dress modestly when visiting religious sites',
    'Bargain politely at markets',
    'Try street food from busy vendors'
  ];

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {/* Header */}
      <View className="px-4 py-4 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
          <ArrowLeftIcon size={24} color="#4F46E5" />
          <Text className="ml-2 text-indigo-600">Back</Text>
        </TouchableOpacity>
        
        <View className="items-center mt-4">
          <CalendarIcon size={32} color="#4F46E5" />
          <Text className="mt-2 text-2xl font-bold text-center text-gray-800">
            {safeItinerary.title || 'Your Travel Itinerary'}
          </Text>
          {safeItinerary.summary && (
            <Text className="text-center text-gray-600">{safeItinerary.summary}</Text>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 p-4 mb-20">
        {/* User Preferences Summary */}
        {userPreferences && (
          <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
            <Text className="mb-3 text-xl font-semibold text-indigo-600">Your Trip Details</Text>
            
            <View className="flex-row items-center mb-2">
              <MapPinIcon size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{userPreferences.destination || 'Thailand'}</Text>
            </View>
            
            <View className="flex-row items-center mb-2">
              <ClockIcon size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{userPreferences.duration} days</Text>
            </View>
            
            <View className="flex-row items-center mb-2">
              <UserGroupIcon size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">{userPreferences.people} people</Text>
            </View>
            
            <View className="flex-row items-center">
              <CurrencyDollarIcon size={20} color="#6B7280" />
              <Text className="ml-2 text-gray-700">${userPreferences.budget} per person</Text>
            </View>
          </View>
        )}

        {/* Daily Itinerary */}
        {safeDays.length > 0 ? (
          <View className="mb-6">
            <Text className="mb-4 text-2xl font-bold text-center text-indigo-600">Daily Plan</Text>
            {safeDays.map((day, index) => (
              <View key={index} className="p-4 mb-4 bg-white rounded-lg shadow-sm">
                <Text className="mb-3 text-xl font-semibold text-indigo-600">
                  Day {day.dayNumber || index + 1}
                </Text>
                
                {Array.isArray(day.activities) ? (
                  day.activities.map((activity, activityIndex) => (
                    <View key={activityIndex} className="flex-row items-start mb-3 last:mb-0">
                      <View className="items-center justify-center w-6 h-6 mt-1 mr-3 bg-indigo-100 rounded-full">
                        <Text className="text-sm font-bold text-indigo-600">{activityIndex + 1}</Text>
                      </View>
                      <Text className="flex-1 leading-6 text-gray-700">{activity}</Text>
                    </View>
                  ))
                ) : (
                  // Fallback if activities is not an array
                  <Text className="leading-6 text-gray-700">No activities planned for this day</Text>
                )}
              </View>
            ))}
          </View>
        ) : (
          // Fallback when no days data
          <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
            <Text className="mb-3 text-xl font-semibold text-indigo-600">Sample Itinerary</Text>
            <Text className="leading-6 text-gray-700">
              Your personalized itinerary will be generated based on your preferences. 
              Typically, it includes cultural site visits, local experiences, and relaxation time.
            </Text>
          </View>
        )}

        {/* Essentials to Pack */}
        <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
          <Text className="mb-3 text-xl font-semibold text-indigo-600">Essentials to Pack</Text>
          {safeEssentials.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2 last:mb-0">
              <Text className="mr-2 text-indigo-600">•</Text>
              <Text className="flex-1 text-gray-700">{item}</Text>
            </View>
          ))}
        </View>

        {/* Local Tips */}
        <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
          <Text className="mb-3 text-xl font-semibold text-indigo-600">Local Tips & Etiquette</Text>
          {safeLocalTips.map((tip, index) => (
            <View key={index} className="flex-row items-start mb-2 last:mb-0">
              <Text className="mr-2 text-indigo-600">•</Text>
              <Text className="flex-1 text-gray-700">{tip}</Text>
            </View>
          ))}
        </View>

        {/* Budget Summary */}
        {userPreferences?.budget && (
          <View className="p-4 mb-6 bg-white rounded-lg shadow-sm">
            <Text className="mb-3 text-xl font-semibold text-indigo-600">Budget Summary</Text>
            <Text className="mb-2 text-gray-700">
              Total budget: <Text className="font-semibold">${userPreferences.budget * userPreferences.people}</Text>
            </Text>
            <Text className="mb-2 text-gray-700">
              Duration: <Text className="font-semibold">{userPreferences.duration} days</Text>
            </Text>
            <Text className="text-gray-700">
              Daily budget: <Text className="font-semibold">
                ${Math.round((userPreferences.budget * userPreferences.people) / userPreferences.duration)}
              </Text> per day
            </Text>
          </View>
        )}

        {/* Call to Action */}
        <TouchableOpacity 
          className="p-4 mb-20 bg-indigo-600 rounded-lg"
          onPress={() => navigation.navigate('MyTrip')}
        >
          <Text className="text-lg font-semibold text-center text-white">
            Save Itinerary
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItineraryScreen;