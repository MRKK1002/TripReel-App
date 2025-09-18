import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeIcon, SparklesIcon, UserIcon } from "react-native-heroicons/solid";

const BottomNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isActive = (routeName) => route.name === routeName;

  return (
    <View className="absolute left-0 right-0 bg-white border-t border-gray-200 bottom-20">
      <View className="flex-row items-center justify-around h-16">
        {/* Home Button */}
        <TouchableOpacity 
          className="flex items-center justify-center"
          onPress={() => navigation.navigate("Home")}
        >
          <HomeIcon 
            size={24} 
            color={isActive("Home") ? "#4F46E5" : "#9CA3AF"} 
          />
          <Text 
            className={`text-xs mt-1 ${isActive("Home") ? "text-indigo-600" : "text-gray-400"}`}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Slider Button */}
        <TouchableOpacity 
          className="flex items-center justify-center"
          onPress={() => navigation.navigate("Slider")}
        >
          <SparklesIcon 
            size={24} 
            color={isActive("Slider") ? "#4F46E5" : "#9CA3AF"} 
          />
          <Text 
            className={`text-xs mt-1 ${isActive("Slider") ? "text-indigo-600" : "text-gray-400"}`}
          >
            Slider
          </Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity 
          className="flex items-center justify-center"
          onPress={() => navigation.navigate("Profile")}
        >
          <UserIcon 
            size={24} 
            color={isActive("Profile") ? "#4F46E5" : "#9CA3AF"} 
          />
          <Text 
            className={`text-xs mt-1 ${isActive("Profile") ? "text-indigo-600" : "text-gray-400"}`}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavbar;