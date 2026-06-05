import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import {
  ArrowLeftIcon,
  MapPinIcon,
  UserGroupIcon,
  HashtagIcon,
  CurrencyDollarIcon,
  HeartIcon,
  CheckCircleIcon,
  UsersIcon,
  PlusIcon,
  MinusIcon,
  ChevronRightIcon,
  SparklesIcon,
  StarIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import { StarIcon as StarIconSolid } from 'react-native-heroicons/solid';
import LottieView from 'lottie-react-native';
import {
  getPersonalizedItinerary,
  getTravelRecommendations,
} from '../services/deepseekApi';
import { ActivityIndicator } from 'react-native';
import categories from '../data/categories';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const MyTrip = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    destination: '',
    departureDate: new Date(),
    duration: 7,
    people: 2,
    places: [],
    budget: 500,
    mood: '',
    travelStyle: '',
    accommodation: '',
  });
  const [showResults, setShowResults] = useState(false);
  const navigation = useNavigation();

  const [aiRecommendations, setAiRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const destinations = [
    {
      name: 'Bangkok',
      image:
        'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400',
    },
    {
      name: 'Phuket',
      image:
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400',
    },
    {
      name: 'Phi Phi Islands',
      image:
        'https://images.unsplash.com/photo-1589394815804-964ed0e2ce08?w=400',
    },
    {
      name: 'Krabi',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    },
    {
      name: 'Chiang Mai',
      image:
        'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=400',
    },
    {
      name: 'Koh Samui',
      image:
        'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=400',
    },
  ];

  const places = [
    { name: 'Beaches', icon: '🏖️' },
    { name: 'Temples', icon: '🛕' },
    { name: 'Markets', icon: '🛒' },
    { name: 'Islands', icon: '🏝️' },
    { name: 'Mountains', icon: '⛰️' },
    { name: 'Cultural Sites', icon: '🎎' },
    { name: 'Nightlife', icon: '🌃' },
    { name: 'Adventure Sports', icon: '🚵' },
  ];

  const moods = [
    { value: 'adventure', label: 'Adventure', icon: '🧗', color: '#10B981' },
    { value: 'cultural', label: 'Cultural', icon: '🎎', color: '#F59E0B' },
    { value: 'honeymoon', label: 'Romantic', icon: '💝', color: '#EC4899' },
    { value: 'relaxation', label: 'Relaxation', icon: '🧘', color: '#3B82F6' },
    { value: 'family', label: 'Family Fun', icon: '👨‍👩‍👧‍👦', color: '#8B5CF6' },
  ];

  const travelStyles = [
    {
      value: 'luxury',
      label: 'Luxury',
      icon: '💎',
      description: 'Premium experiences with high-end accommodations',
    },
    {
      value: 'budget',
      label: 'Budget',
      icon: '💰',
      description: 'Cost-effective options without compromising experiences',
    },
    {
      value: 'backpacker',
      label: 'Backpacker',
      icon: '🎒',
      description: 'Adventurous and economical travel style',
    },
    {
      value: 'mid-range',
      label: 'Mid-range',
      icon: '⚖️',
      description: 'Balance between comfort and cost',
    },
  ];

  const accommodations = [
    { value: 'hotel', label: 'Hotels', icon: '🏨' },
    { value: 'resort', label: 'Resorts', icon: '🏝️' },
    { value: 'villa', label: 'Villas', icon: '🏡' },
    { value: 'hostel', label: 'Hostels', icon: '🛏️' },
    { value: 'homestay', label: 'Homestays', icon: '👨‍👩‍👧‍👦' },
  ];

  const questions = [
    {
      title: 'Where would you like to go?',
      subtitle: 'Choose your dream destination in Thailand',
      icon: MapPinIcon,
    },
    {
      title: 'When are you planning to travel?',
      subtitle: 'Select your preferred travel dates',
      icon: CalendarIcon,
    },
    {
      title: 'How long is your trip?',
      subtitle: 'Number of days for your adventure',
      icon: ClockIcon,
    },
    {
      title: 'How many people?',
      subtitle: 'Tell us about your travel group',
      icon: UserGroupIcon,
    },
    {
      title: 'What interests you most?',
      subtitle: "Select places and activities you'd love to explore",
      icon: HashtagIcon,
    },
    {
      title: "What's your budget?",
      subtitle: 'Per person budget for the trip',
      icon: CurrencyDollarIcon,
    },
    {
      title: "What's your travel style?",
      subtitle: 'How do you prefer to travel?',
      icon: StarIcon,
    },
    {
      title: 'Preferred accommodation?',
      subtitle: 'Where would you like to stay?',
      icon: ShieldCheckIcon,
    },
    {
      title: "What's your travel mood?",
      subtitle: 'Choose the vibe for your perfect trip',
      icon: HeartIcon,
    },
  ];

  // Update preference function
  const updatePreference = (key, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle place selection
  const togglePlace = place => {
    setUserPreferences(prev => ({
      ...prev,
      places: prev.places.includes(place)
        ? prev.places.filter(p => p !== place)
        : [...prev.places, place],
    }));
  };

  // Get matching packages based on preferences
  // const getMatchingPackages = () => {
  //   return categories.filter(category => {
  //     const pkg = category.packages[0];
  //     const withinBudget = pkg.price <= userPreferences.budget * 1.2;
  //     const matchesPeople = Math.abs(pkg.people - userPreferences.people) <= 2;
  //     const matchesMood = !userPreferences.mood || category.mood === userPreferences.mood;

  //     return withinBudget && matchesPeople && matchesMood;
  //   });
  // };

  // Get matching packages based on preferences (more flexible matching)
  const getMatchingPackages = () => {
    // If we have AI recommendations but no exact package matches,
    // return some relevant packages anyway
    if (aiRecommendations && categories.length > 0) {
      const relevantPackages = categories.filter(category => {
        const pkg = category.packages[0];

        // Check if package destination matches or is similar to user preference
        const destinationMatch =
          !userPreferences.destination ||
          pkg.title
            .toLowerCase()
            .includes(userPreferences.destination.toLowerCase()) ||
          category.description
            .toLowerCase()
            .includes(userPreferences.destination.toLowerCase());

        // Check if package mood matches
        const moodMatch =
          !userPreferences.mood || category.mood === userPreferences.mood;

        // Check if package is within reasonable budget range
        const budgetMatch = pkg.price <= userPreferences.budget * 1.5;

        return destinationMatch && moodMatch && budgetMatch;
      });

      // If we found relevant packages, return them
      if (relevantPackages.length > 0) {
        return relevantPackages;
      }

      // Otherwise return some popular packages as fallback
      return categories.slice(0, 3);
    }

    // Original matching logic
    return categories.filter(category => {
      const pkg = category.packages[0];
      const withinBudget = pkg.price <= userPreferences.budget * 1.2;
      const matchesPeople = Math.abs(pkg.people - userPreferences.people) <= 2;
      const matchesMood =
        !userPreferences.mood || category.mood === userPreferences.mood;

      return withinBudget && matchesPeople && matchesMood;
    });
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentStep(0);
    setShowResults(false);
    setUserPreferences({
      destination: '',
      departureDate: new Date(),
      duration: 7,
      people: 2,
      places: [],
      budget: 500,
      mood: '',
      travelStyle: '',
      accommodation: '',
    });
  };

  // Handle book now
  const handleBookNow = pkg => {
    navigation.navigate('PackageDetails', { package: pkg });
  };

  // Fallback recommendations if API fails
  // const getFallbackRecommendations = (preferences) => {
  //   return {
  //     summary: `Based on your preferences for ${preferences.destination || 'Thailand'},
  //               we've curated these amazing experiences just for you. Your ${preferences.duration}-day trip
  //               for ${preferences.people} people with a ${preferences.mood} focus is perfect for exploring
  //               the best of what Thailand has to offer.`,
  //     personalizedTips: [
  //       `Visit ${preferences.destination || 'Bangkok'} during the early morning to avoid crowds`,
  //       `Try the local street food for an authentic experience`,
  //       `Book temple visits in the cooler parts of the day`,
  //     ],
  //     hiddenGems: [
  //       {
  //         name: 'Secret Beach',
  //         location: 'Near Phi Phi Islands',
  //         description: 'A secluded beach only accessible by boat during low tide'
  //       },
  //       {
  //         name: 'Local Market Experience',
  //         location: 'Chiang Mai',
  //         description: 'Authentic market where locals shop, not tourists'
  //       }
  //     ]
  //   };
  // };

  // Fallback recommendations if API fails
  const getFallbackRecommendations = preferences => {
    return {
      summary: `Based on your preferences for ${
        preferences.destination || 'Thailand'
      }, 
              we've curated these amazing experiences just for you. Your ${
                preferences.duration
              }-day trip 
              for ${preferences.people} people with a ${
        preferences.mood
      } focus is perfect for exploring 
              the best of what Thailand has to offer.`,
      personalizedTips: [
        `Visit ${
          preferences.destination || 'Bangkok'
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
  };

  // Fallback itinerary if API fails
  const getFallbackItinerary = (pkg, preferences) => {
    return {
      title: `${preferences.duration}-Day ${preferences.destination} Adventure`,
      summary: `Your personalized ${preferences.duration}-day journey through ${
        preferences.destination || 'Thailand'
      } 
                designed for ${preferences.people} people with a focus on ${
        preferences.mood
      } experiences.`,
      days: Array.from({ length: preferences.duration }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}: Exploring ${
          preferences.destination || 'Thailand'
        }`,
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
    };
  };

  // const handleNext = async () => {
  //   if (currentStep < questions.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     setLoading(true);
  //     try {
  //       const recommendations = await getTravelRecommendations(userPreferences);
  //       setAiRecommendations(recommendations);
  //     } catch (error) {
  //       const fallbackRecs = getFallbackRecommendations(userPreferences);
  //       setAiRecommendations(fallbackRecs);
  //       Alert.alert(
  //         'Info',
  //         'Using personalized recommendations (AI service temporarily unavailable)',
  //         [{ text: 'OK' }],
  //       );
  //     }
  //     setTimeout(() => {
  //       setLoading(false);
  //       setShowResults(true);
  //     }, 5000);
  //   }
  // };

  // const handleGenerateItinerary = async pkg => {
  //   setLoading2(true);
  //   try {
  //     const itinerary = await getPersonalizedItinerary(pkg, userPreferences);
  //     setTimeout(() => {
  //       setLoading2(false);
  //       navigation.navigate('Itinerary', {
  //         itinerary,
  //         package: pkg,
  //         userPreferences,
  //       });
  //     }, 5000);
  //   } catch (error) {
  //     const fallbackItinerary = getFallbackItinerary(pkg, userPreferences);
  //     setTimeout(() => {
  //       setLoading2(false);
  //       navigation.navigate('Itinerary', {
  //         itinerary: fallbackItinerary,
  //         package: pkg,
  //         userPreferences,
  //       });
  //       Alert.alert(
  //         'Info',
  //         'Generated itinerary with basic template (AI service temporarily unavailable)',
  //         [{ text: 'OK' }],
  //       );
  //     }, 5000);
  //   }
  // };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        const recommendations = await getTravelRecommendations(userPreferences);
        setAiRecommendations(recommendations);
        setShowResults(true);
      } catch {
        const fallbackRecs = getFallbackRecommendations(userPreferences);
        setAiRecommendations(fallbackRecs);
        Alert.alert(
          'Info',
          'Using personalized recommendations (AI service temporarily unavailable)',
          [{ text: 'OK' }],
        );
        setShowResults(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenerateItinerary = async pkg => {
    setLoading2(true);
    try {
      const itinerary = await getPersonalizedItinerary(pkg, userPreferences);
      navigation.navigate('Itinerary', {
        itinerary,
        package: pkg,
        userPreferences,
      });
    } catch {
      const fallbackItinerary = getFallbackItinerary(pkg, userPreferences);
      navigation.navigate('Itinerary', {
        itinerary: fallbackItinerary,
        package: pkg,
        userPreferences,
      });
      Alert.alert(
        'Info',
        'Generated itinerary with basic template (AI service temporarily unavailable)',
        [{ text: 'OK' }],
      );
    } finally {
      setLoading2(false);
    }
  };

  const handleViewAIRecommendations = () => {
    navigation.navigate('AIRecommendations', {
      recommendations:
        aiRecommendations || getFallbackRecommendations(userPreferences),
      userPreferences,
    });
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <View className="absolute inset-0 z-10 flex items-center justify-center mb-32 bg-white bg-opacity-50">
        <View className="items-center">
          <LottieView
            source={require('./../assets/Passport.json')}
            autoPlay
            loop
            style={{ width: 300, height: 300 }}
          />

          <Text className="mt-4 text-xl font-extrabold text-center text-gray-800">
            Crafting your dream travel packages ✈️✨
          </Text>

          <Text className="px-6 mt-2 text-sm text-center text-gray-600">
            Sit back & relax while we find the perfect trip for you 🌍
          </Text>
        </View>
      </View>
    );
  }

  // if (showResults) {
  //   const matchingPackages = getMatchingPackages();

  //   return (
  //     <View className="flex-1 mt-16 mb-32 ">
  //       {loading2 && (
  //         <View className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
  //           <View className="items-center">
  //             <LottieView
  //               source={require('./../assets/Travel.json')}
  //               autoPlay
  //               loop
  //               style={{ width: 300, height: 300 }}
  //             />

  //             <Text className="mt-4 text-xl font-extrabold text-center text-gray-800">
  //               Planning your perfect itinerary 🗺️✨
  //             </Text>

  //             <Text className="px-6 mt-2 text-sm text-center text-gray-600">
  //               Sit tight while we map your journey and find hidden gems 🌍
  //             </Text>
  //           </View>
  //         </View>
  //       )}

  //       <ScrollView className="flex-1 bg-white">
  //         <View className="px-4 py-6">
  //           {aiRecommendations && (
  //             <TouchableOpacity
  //               onPress={handleViewAIRecommendations}
  //               className="flex-row items-center justify-between p-4 mb-6 bg-indigo-100 rounded-lg"
  //             >
  //               <View className="flex-row items-center">
  //                 <SparklesIcon size={24} color="#4F46E5" />
  //                 <Text className="ml-3 font-semibold text-indigo-700">
  //                   View AI-Powered Recommendations
  //                 </Text>
  //               </View>
  //               <ChevronRightIcon size={20} color="#4F46E5" />
  //             </TouchableOpacity>
  //           )}

  //           <View className="items-center mb-8">
  //             <Text className="mb-2 text-3xl font-bold text-center text-gray-800">
  //               Perfect Matches for You!
  //             </Text>
  //             <Text className="mb-4 text-base text-center text-gray-600">
  //               Based on your preferences, here are the best travel packages
  //             </Text>
  //             <TouchableOpacity
  //               onPress={resetQuiz}
  //               className="px-6 py-3 bg-indigo-600 rounded-lg"
  //             >
  //               <Text className="font-semibold text-white">Start Over</Text>
  //             </TouchableOpacity>
  //           </View>

  //           {matchingPackages.length === 0 ? (
  //             <View className="items-center py-12">
  //               <View className="p-8 mx-4 bg-white rounded-lg shadow-lg">
  //                 <Text className="mb-4 text-xl font-semibold text-center text-gray-700">
  //                   No exact matches found
  //                 </Text>
  //                 <Text className="mb-4 text-center text-gray-600">
  //                   Try adjusting your budget or preferences
  //                 </Text>
  //                 <TouchableOpacity
  //                   onPress={resetQuiz}
  //                   className="px-6 py-3 bg-indigo-600 rounded-lg"
  //                 >
  //                   <Text className="font-semibold text-center text-white">
  //                     Try Again
  //                   </Text>
  //                 </TouchableOpacity>
  //               </View>
  //             </View>
  //           ) : (
  //             <View>
  //               {matchingPackages.map(category => {
  //                 const pkg = category.packages[0];
  //                 return (
  //                   <View
  //                     key={category.id}
  //                     className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl"
  //                   >
  //                     <View className="relative">
  //                       <Image
  //                         source={{ uri: pkg.images[0] }}
  //                         className="w-full h-48"
  //                         resizeMode="cover"
  //                       />
  //                       <View className="absolute px-3 py-1 bg-red-500 rounded-full top-4 right-4">
  //                         <Text className="text-sm font-semibold text-white">
  //                           {pkg.discount} OFF
  //                         </Text>
  //                       </View>
  //                     </View>

  //                     <View className="p-4">
  //                       <Text className="mb-2 text-xl font-bold text-gray-800">
  //                         {pkg.title}
  //                       </Text>
  //                       <Text className="mb-4 text-sm text-gray-600">
  //                         {category.description}
  //                       </Text>

  //                       <View className="flex-row items-center justify-between mb-4">
  //                         <Text className="text-2xl font-bold text-indigo-600">
  //                           ${pkg.price}
  //                         </Text>
  //                         <View className="flex-row items-center">
  //                           <UsersIcon size={16} color="#6B7280" />
  //                           <Text className="ml-1 text-sm text-gray-500">
  //                             {pkg.people} people
  //                           </Text>
  //                         </View>
  //                       </View>

  //                       <View className="mb-4">
  //                         <Text className="mb-2 font-semibold text-gray-700">
  //                           Includes:
  //                         </Text>
  //                         <View className="flex-row flex-wrap">
  //                           {pkg.includes.slice(0, 4).map((item, idx) => (
  //                             <View
  //                               key={idx}
  //                               className="flex-row items-center mb-1 mr-4"
  //                             >
  //                               <CheckCircleIcon size={12} color="#10B981" />
  //                               <Text className="ml-1 text-sm text-green-600">
  //                                 {item}
  //                               </Text>
  //                             </View>
  //                           ))}
  //                         </View>
  //                       </View>

  //                       <View className="mb-4">
  //                         <Text className="mb-2 font-semibold text-gray-700">
  //                           Destinations:
  //                         </Text>
  //                         <View className="flex-row flex-wrap">
  //                           {pkg.touristPlaces.slice(0, 3).map((place, idx) => (
  //                             <View
  //                               key={idx}
  //                               className="px-2 py-1 mb-1 mr-2 bg-blue-100 rounded-full"
  //                             >
  //                               <Text className="text-xs text-blue-700">
  //                                 {place}
  //                               </Text>
  //                             </View>
  //                           ))}
  //                           {pkg.touristPlaces.length > 3 && (
  //                             <View className="px-2 py-1 bg-gray-100 rounded-full">
  //                               <Text className="text-xs text-gray-600">
  //                                 +{pkg.touristPlaces.length - 3} more
  //                               </Text>
  //                             </View>
  //                           )}
  //                         </View>
  //                       </View>

  //                       <View className="flex-row gap-3 mt-4">
  //                         <TouchableOpacity
  //                           className="flex-1 py-3 bg-indigo-600 rounded-lg"
  //                           onPress={() => handleBookNow(pkg)}
  //                         >
  //                           <Text className="font-semibold text-center text-white">
  //                             Book Now
  //                           </Text>
  //                         </TouchableOpacity>

  //                         <TouchableOpacity
  //                           className="flex-1 py-3 border border-indigo-600 rounded-lg"
  //                           onPress={() => handleGenerateItinerary(pkg)}
  //                         >
  //                           <Text className="font-semibold text-center text-indigo-600">
  //                             Plan Itinerary
  //                           </Text>
  //                         </TouchableOpacity>
  //                       </View>
  //                     </View>
  //                   </View>
  //                 );
  //               })}
  //             </View>
  //           )}
  //         </View>
  //       </ScrollView>
  //     </View>
  //   );
  // }

  // Question Steps

  if (showResults) {
    const matchingPackages = getMatchingPackages();

    return (
      <View className="flex-1 mt-16 mb-32 ">
        {loading2 && (
          <View className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
            <View className="items-center">
              <LottieView
                source={require('./../assets/Travel.json')}
                autoPlay
                loop
                style={{ width: 300, height: 300 }}
              />

              <Text className="mt-4 text-xl font-extrabold text-center text-gray-800">
                Planning your perfect itinerary 🗺️✨
              </Text>

              <Text className="px-6 mt-2 text-sm text-center text-gray-600">
                Sit tight while we map your journey and find hidden gems 🌍
              </Text>
            </View>
          </View>
        )}

        <ScrollView className="flex-1 bg-white">
          <View className="px-4 py-6">
            {/* AI Recommendations Card - Always show this when we have AI data */}
            {aiRecommendations && (
              <View className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                <View className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Text className="text-2xl font-bold text-white">
                    AI-Powered Recommendations
                  </Text>
                  <Text className="mt-2 text-indigo-100">
                    Personalized just for your trip to{' '}
                    {userPreferences.destination}
                  </Text>
                </View>

                <View className="p-6">
                  {/* Summary */}
                  <Text className="text-lg font-semibold text-gray-800">
                    Trip Summary
                  </Text>
                  <Text className="mt-2 text-gray-600">
                    {aiRecommendations.summary}
                  </Text>

                  {/* Personalized Tips */}
                  <Text className="mt-6 text-lg font-semibold text-gray-800">
                    Personalized Tips
                  </Text>
                  {aiRecommendations.personalizedTips.map((tip, index) => (
                    <View key={index} className="flex-row items-start mt-3">
                      <View className="items-center justify-center w-6 h-6 mt-1 mr-3 bg-indigo-100 rounded-full">
                        <Text className="text-sm font-bold text-indigo-600">
                          {index + 1}
                        </Text>
                      </View>
                      <Text className="flex-1 text-gray-600">{tip}</Text>
                    </View>
                  ))}

                  {/* Hidden Gems */}
                  <Text className="mt-6 text-lg font-semibold text-gray-800">
                    Hidden Gems
                  </Text>
                  {aiRecommendations.hiddenGems.map((gem, index) => (
                    <View
                      key={index}
                      className="p-4 mt-3 rounded-lg bg-indigo-50"
                    >
                      <Text className="font-semibold text-indigo-700">
                        {gem.name}
                      </Text>
                      <Text className="text-sm text-indigo-600">
                        {gem.location}
                      </Text>
                      <Text className="mt-1 text-gray-600">
                        {gem.description}
                      </Text>
                    </View>
                  ))}

                  {/* Seasonal Considerations */}
                  <Text className="mt-6 text-lg font-semibold text-gray-800">
                    Seasonal Tips
                  </Text>
                  <Text className="mt-2 text-gray-600">
                    {aiRecommendations.seasonalConsiderations}
                  </Text>

                  <TouchableOpacity
                    onPress={handleViewAIRecommendations}
                    className="flex-row items-center justify-center p-4 mt-6 bg-indigo-100 rounded-lg"
                  >
                    <SparklesIcon size={24} color="#4F46E5" />
                    <Text className="ml-3 font-semibold text-indigo-700">
                      View Detailed Recommendations
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View className="items-center mb-8">
              <Text className="mb-2 text-3xl font-bold text-center text-gray-800">
                Perfect Matches for You!
              </Text>
              <Text className="mb-4 text-base text-center text-gray-600">
                Based on your preferences, here are the best travel packages
              </Text>
              <TouchableOpacity
                onPress={resetQuiz}
                className="px-6 py-3 bg-indigo-600 rounded-lg"
              >
                <Text className="font-semibold text-white">Start Over</Text>
              </TouchableOpacity>
            </View>

            {matchingPackages.length === 0 ? (
              <View className="items-center py-12">
                <View className="p-8 mx-4 bg-white rounded-lg shadow-lg">
                  <Text className="mb-4 text-xl font-semibold text-center text-gray-700">
                    No exact package matches found
                  </Text>
                  <Text className="mb-4 text-center text-gray-600">
                    But don't worry! Our AI recommendations above are tailored
                    specifically for you.
                  </Text>
                  <Text className="mb-4 text-center text-gray-600">
                    You can still plan an itinerary based on our AI suggestions.
                  </Text>

                  {/* Fallback itinerary option */}
                  <TouchableOpacity
                    onPress={() =>
                      handleGenerateItinerary({
                        id: 'custom-ai-trip',
                        title: `Custom ${userPreferences.destination} Trip`,
                        description:
                          'Personalized trip based on AI recommendations',
                        price: userPreferences.budget,
                        people: userPreferences.people,
                        includes: [
                          'AI-curated experiences',
                          'Personalized recommendations',
                        ],
                        touristPlaces: userPreferences.places,
                        images: [
                          'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400',
                        ],
                      })
                    }
                    className="px-6 py-3 bg-indigo-600 rounded-lg"
                  >
                    <Text className="font-semibold text-center text-white">
                      Create Custom Itinerary
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                {matchingPackages.map(category => {
                  const pkg = category.packages[0];
                  return (
                    <View
                      key={category.id}
                      className="mb-6 overflow-hidden bg-white shadow-lg rounded-xl"
                    >
                      <View className="relative">
                        <Image
                          source={{ uri: pkg.images[0] }}
                          className="w-full h-48"
                          resizeMode="cover"
                        />
                        <View className="absolute px-3 py-1 bg-red-500 rounded-full top-4 right-4">
                          <Text className="text-sm font-semibold text-white">
                            {pkg.discount} OFF
                          </Text>
                        </View>
                      </View>

                      <View className="p-4">
                        <Text className="mb-2 text-xl font-bold text-gray-800">
                          {pkg.title}
                        </Text>
                        <Text className="mb-4 text-sm text-gray-600">
                          {category.description}
                        </Text>

                        <View className="flex-row items-center justify-between mb-4">
                          <Text className="text-2xl font-bold text-indigo-600">
                            ${pkg.price}
                          </Text>
                          <View className="flex-row items-center">
                            <UsersIcon size={16} color="#6B7280" />
                            <Text className="ml-1 text-sm text-gray-500">
                              {pkg.people} people
                            </Text>
                          </View>
                        </View>

                        <View className="mb-4">
                          <Text className="mb-2 font-semibold text-gray-700">
                            Includes:
                          </Text>
                          <View className="flex-row flex-wrap">
                            {pkg.includes.slice(0, 4).map((item, idx) => (
                              <View
                                key={idx}
                                className="flex-row items-center mb-1 mr-4"
                              >
                                <CheckCircleIcon size={12} color="#10B981" />
                                <Text className="ml-1 text-sm text-green-600">
                                  {item}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        <View className="mb-4">
                          <Text className="mb-2 font-semibold text-gray-700">
                            Destinations:
                          </Text>
                          <View className="flex-row flex-wrap">
                            {pkg.touristPlaces.slice(0, 3).map((place, idx) => (
                              <View
                                key={idx}
                                className="px-2 py-1 mb-1 mr-2 bg-blue-100 rounded-full"
                              >
                                <Text className="text-xs text-blue-700">
                                  {place}
                                </Text>
                              </View>
                            ))}
                            {pkg.touristPlaces.length > 3 && (
                              <View className="px-2 py-1 bg-gray-100 rounded-full">
                                <Text className="text-xs text-gray-600">
                                  +{pkg.touristPlaces.length - 3} more
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        <View className="flex-row gap-3 mt-4">
                          <TouchableOpacity
                            className="flex-1 py-3 bg-indigo-600 rounded-lg"
                            onPress={() => handleBookNow(pkg)}
                          >
                            <Text className="font-semibold text-center text-white">
                              Book Now
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            className="flex-1 py-3 border border-indigo-600 rounded-lg"
                            onPress={() => handleGenerateItinerary(pkg)}
                          >
                            <Text className="font-semibold text-center text-indigo-600">
                              Plan Itinerary
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  const renderStep = () => {
    const HashtagIcon = questions[currentStep].icon;

    switch (currentStep) {
      case 0: // Destination
        return (
          <View className="px-6">
            <View className="grid grid-cols-2 gap-4">
              {destinations.map(dest => (
                <TouchableOpacity
                  key={dest.name}
                  onPress={() => updatePreference('destination', dest.name)}
                  className={`rounded-xl border-2 overflow-hidden ${
                    userPreferences.destination === dest.name
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <Image
                    source={{ uri: dest.image }}
                    className="w-full h-32"
                    resizeMode="cover"
                  />
                  <Text
                    className={`p-3 text-center font-medium ${
                      userPreferences.destination === dest.name
                        ? 'text-indigo-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {dest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 1: // Travel Date
        return (
          <View className="px-6">
            <View className="items-center p-6 bg-indigo-50 rounded-xl">
              <Text className="mb-4 text-lg font-semibold text-indigo-700">
                {userPreferences.departureDate.toDateString()}
              </Text>
              <TouchableOpacity
                className="px-6 py-3 bg-indigo-600 rounded-lg"
                onPress={() => {
                  // In a real app, you would show a date picker here
                  const newDate = new Date();
                  newDate.setDate(newDate.getDate() + 30);
                  updatePreference('departureDate', newDate);
                }}
              >
                <Text className="font-medium text-white">Select Date</Text>
              </TouchableOpacity>
            </View>
            <Text className="mt-4 text-sm text-center text-gray-500">
              Tip: Travel between November and February for the best weather
            </Text>
          </View>
        );

      case 2: // Duration
        return (
          <View className="px-6">
            <View className="items-center space-y-6">
              <Text className="text-3xl font-bold text-indigo-600">
                {userPreferences.duration} days
              </Text>

              <View className="w-full">
                <View className="flex-row justify-between mb-2">
                  <Text className="text-gray-500">3 days</Text>
                  <Text className="text-gray-500">21 days</Text>
                </View>

                <View className="relative">
                  <View className="h-2 bg-gray-200 rounded-full"></View>
                  <View
                    className="absolute h-2 bg-indigo-600 rounded-full"
                    style={{
                      width: `${((userPreferences.duration - 3) / 18) * 100}%`,
                    }}
                  ></View>
                  <View
                    className="absolute w-6 h-6 bg-indigo-600 rounded-full -top-2"
                    style={{
                      left: `${((userPreferences.duration - 3) / 18) * 100}%`,
                      marginLeft: -12,
                    }}
                  ></View>
                </View>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() =>
                    updatePreference(
                      'duration',
                      Math.max(3, userPreferences.duration - 1),
                    )
                  }
                  className="items-center justify-center w-12 h-12 bg-indigo-100 rounded-full"
                >
                  <MinusIcon size={20} color="#4F46E5" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    updatePreference(
                      'duration',
                      Math.min(21, userPreferences.duration + 1),
                    )
                  }
                  className="items-center justify-center w-12 h-12 bg-indigo-100 rounded-full"
                >
                  <PlusIcon size={20} color="#4F46E5" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 3: // People
        return (
          <View className="px-6">
            <View className="flex-row items-center justify-center gap-3 space-x-4">
              <TouchableOpacity
                onPress={() =>
                  updatePreference(
                    'people',
                    Math.max(1, userPreferences.people - 1),
                  )
                }
                className="items-center justify-center w-12 h-12 bg-indigo-100 rounded-full"
              >
                <MinusIcon size={20} color="#4F46E5" />
              </TouchableOpacity>

              <View className="w-32 px-6 py-4 bg-white border-2 border-indigo-200 rounded-xl">
                <Text className="text-2xl font-bold text-center text-indigo-600">
                  {userPreferences.people}
                </Text>
                <Text className="text-center text-gray-600">
                  {userPreferences.people === 1 ? 'Person' : 'People'}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  updatePreference('people', userPreferences.people + 1)
                }
                className="items-center justify-center w-12 h-12 bg-indigo-100 rounded-full"
              >
                <PlusIcon size={20} color="#4F46E5" />
              </TouchableOpacity>
            </View>

            <View className="mt-8">
              <Text className="mb-3 font-medium text-gray-700">
                Traveling with:
              </Text>
              <View className="flex-row flex-wrap justify-center gap-2">
                {['Solo', 'Couple', 'Family', 'Friends', 'Business'].map(
                  type => (
                    <TouchableOpacity
                      key={type}
                      className="px-4 py-2 bg-gray-100 rounded-full"
                    >
                      <Text className="text-gray-700">{type}</Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>
            </View>
          </View>
        );

      case 4: // Places
        return (
          <View className="px-6">
            <View className="flex-row flex-wrap justify-center">
              {places.map(place => (
                <TouchableOpacity
                  key={place.name}
                  onPress={() => togglePlace(place.name)}
                  className={`m-2 p-4 rounded-xl border-2 flex-col items-center w-40 ${
                    userPreferences.places.includes(place.name)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text className="mb-2 text-2xl">{place.icon}</Text>
                  <Text
                    className={`text-center font-medium ${
                      userPreferences.places.includes(place.name)
                        ? 'text-indigo-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {place.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 5: // Budget
        return (
          <View className="px-6">
            <View className="items-center space-y-6">
              <Text className="text-3xl font-bold text-indigo-600">
                ${userPreferences.budget}
              </Text>
              <Text className="text-gray-600">per person</Text>

              <View className="w-full space-y-4">
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">$200</Text>
                  <Text className="text-gray-500">$2000</Text>
                </View>

                <View className="relative">
                  <View className="h-2 bg-gray-200 rounded-full"></View>
                  <View
                    className="absolute h-2 bg-indigo-600 rounded-full"
                    style={{
                      width: `${
                        ((userPreferences.budget - 200) / 1800) * 100
                      }%`,
                    }}
                  ></View>
                  <View
                    className="absolute w-6 h-6 bg-indigo-600 rounded-full -top-2"
                    style={{
                      left: `${((userPreferences.budget - 200) / 1800) * 100}%`,
                      marginLeft: -12,
                    }}
                  ></View>
                </View>

                <View className="flex-row flex-wrap justify-center gap-2">
                  {[200, 500, 800, 1200, 2000].map(budget => (
                    <TouchableOpacity
                      key={budget}
                      onPress={() => updatePreference('budget', budget)}
                      className={`px-4 py-2 rounded-full ${
                        userPreferences.budget === budget
                          ? 'bg-indigo-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      <Text
                        className={
                          userPreferences.budget === budget
                            ? 'text-white font-medium'
                            : 'text-gray-700'
                        }
                      >
                        ${budget}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
        );

      case 6: // Travel Style
        return (
          <View className="px-6">
            <View className="space-y-4">
              {travelStyles.map(style => (
                <TouchableOpacity
                  key={style.value}
                  onPress={() => updatePreference('travelStyle', style.value)}
                  className={`p-4 rounded-xl border-2 flex-row items-center ${
                    userPreferences.travelStyle === style.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <Text className="mr-3 text-2xl">{style.icon}</Text>
                  <View className="flex-1">
                    <Text
                      className={`font-medium ${
                        userPreferences.travelStyle === style.value
                          ? 'text-indigo-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {style.label}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      {style.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 7: // Accommodation
        return (
          <View className="px-6">
            <View className="flex-row flex-wrap justify-center">
              {accommodations.map(acc => (
                <TouchableOpacity
                  key={acc.value}
                  onPress={() => updatePreference('accommodation', acc.value)}
                  className={`m-2 p-4 rounded-xl border-2 flex-col items-center w-40 ${
                    userPreferences.accommodation === acc.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <Text className="mb-2 text-2xl">{acc.icon}</Text>
                  <Text
                    className={`text-center font-medium ${
                      userPreferences.accommodation === acc.value
                        ? 'text-indigo-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {acc.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 8: // Mood
        return (
          <View className="px-6">
            <View className="space-y-4">
              {moods.map(mood => (
                <TouchableOpacity
                  key={mood.value}
                  onPress={() => updatePreference('mood', mood.value)}
                  className={`p-4 rounded-xl border-2 flex-row items-center ${
                    userPreferences.mood === mood.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                  style={
                    userPreferences.mood === mood.value
                      ? { borderColor: mood.color }
                      : {}
                  }
                >
                  <Text className="mr-3 text-2xl">{mood.icon}</Text>
                  <Text
                    className={`font-medium ${
                      userPreferences.mood === mood.value
                        ? 'text-indigo-700'
                        : 'text-gray-700'
                    }`}
                  >
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1b2b51]">
      <StatusBar
        barStyle="light-content"
        backgroundColor="#1b2b51"
        translucent={false}
      />
      <View className="flex-1 bg-white">
        {/* Progress Bar */}
        <View className="h-2 bg-gray-200">
          <View
            className="h-full bg-indigo-600"
            style={{
              width: `${((currentStep + 1) / questions.length) * 100}%`,
            }}
          />
        </View>

        {/* Header */}
        <View className="px-6 py-6 mt-12">
          <View className="flex-row items-center justify-between mb-6">
            {currentStep > 0 ? (
              <TouchableOpacity onPress={handlePrev} className="p-2">
                <ArrowLeftIcon size={24} color="#4F46E5" />
              </TouchableOpacity>
            ) : (
              <View className="w-8" />
            )}

            <Text className="text-lg font-semibold text-gray-500">
              {currentStep + 1}/{questions.length}
            </Text>

            <View className="w-8" />
          </View>

          <View className="items-center justify-center mb-4">
            <View className="items-center justify-center w-16 h-16 mb-4 bg-indigo-100 rounded-full">
              <HashtagIcon size={24} color="#4F46E5" />
            </View>

            <Text className="mb-2 text-2xl font-bold text-center text-gray-800">
              {questions[currentStep].title}
            </Text>

            <Text className="text-center text-gray-600">
              {questions[currentStep].subtitle}
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {renderStep()}
        </ScrollView>

        {/* Navigation */}
        <View className="px-6 py-4 bg-white border-t border-gray-200">
          <View className="flex-row justify-between">
            {currentStep > 0 ? (
              <TouchableOpacity
                onPress={handlePrev}
                className="px-6 py-3 mb-32 border border-indigo-600 rounded-lg"
              >
                <Text className="font-medium text-gray-700">Previous</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}

            <TouchableOpacity
              onPress={handleNext}
              className="px-6 py-3 mb-32 bg-indigo-600 rounded-lg"
              disabled={currentStep === 0 && !userPreferences.destination}
            >
              <Text className="font-medium text-white">
                {currentStep === questions.length - 1 ? 'Find My Trip' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTrip;
