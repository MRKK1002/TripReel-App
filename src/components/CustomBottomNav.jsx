import { View, Text, TouchableOpacity } from "react-native";
import { Home, Image } from "lucide-react-native"; // modern icons
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CustomBottomNav() {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const tabs = [
    { name: "Home", label: "Home", icon: <Home size={22} /> },
    { name: "Slider", label: "Slider", icon: <Image size={22} /> },
  ];

  return (
    <View
      className="flex-row items-center justify-around bg-white shadow-lg rounded-t-2xl"
      style={{
        paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        height: 70 + insets.bottom,
      }}
    >
      {tabs.map((tab) => {
        const focused = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            className="items-center flex-1"
          >
            <View
              className={`p-2 rounded-full ${
                focused ? "bg-blue-100" : ""
              }`}
            >
              <Text className={focused ? "text-blue-600" : "text-gray-400"}>
                {tab.icon}
              </Text>
            </View>
            <Text
              className={`text-xs ${
                focused ? "text-blue-600 font-semibold" : "text-gray-400"
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
