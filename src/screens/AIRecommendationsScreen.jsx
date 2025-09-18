import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ArrowLeftIcon, SparklesIcon } from 'react-native-heroicons/outline';

const AIRecommendationsScreen = ({ route, navigation }) => {
  const { recommendations, userPreferences } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <View className="px-4 py-4 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
          <ArrowLeftIcon size={24} color="#4F46E5" />
          <Text className="ml-2 text-indigo-600">Back</Text>
        </TouchableOpacity>
        
        <View className="items-center mt-4">
          <SparklesIcon size={32} color="#4F46E5" />
          <Text className="mt-2 text-2xl font-bold text-gray-800">AI-Powered Recommendations</Text>
          <Text className="text-gray-600">Personalized just for you</Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Recommendations */}
        <View className="mb-6">
          <Text className="mb-3 text-xl font-semibold text-gray-800">Recommended Experiences</Text>
          {recommendations.recommendations.map((rec, index) => (
            <View key={index} className="p-4 mb-3 bg-white rounded-lg shadow-sm">
              <Text className="text-lg font-medium text-indigo-600">{rec.category}</Text>
              <Text className="mt-2 text-gray-700">{rec.reason}</Text>
              
              <View className="mt-3">
                <Text className="font-medium text-gray-800">Suggested Activities:</Text>
                {rec.suggestedActivities.map((activity, i) => (
                  <View key={i} className="flex-row items-center mt-1">
                    <View className="w-1 h-1 mr-2 bg-gray-500 rounded-full" />
                    <Text className="text-gray-600">{activity}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Travel Tips */}
        <View className="mb-6">
          <Text className="mb-3 text-xl font-semibold text-gray-800">Travel Tips</Text>
          <View className="p-4 bg-white rounded-lg shadow-sm">
            {recommendations.travelTips.map((tip, index) => (
              <View key={index} className="flex-row items-start mt-2 first:mt-0">
                <Text className="mr-2 text-indigo-600">•</Text>
                <Text className="flex-1 text-gray-700">{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Budget Advice */}
        <View className="mb-6">
          <Text className="mb-3 text-xl font-semibold text-gray-800">Budget Advice</Text>
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-gray-700">{recommendations.budgetAdvice}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AIRecommendationsScreen;