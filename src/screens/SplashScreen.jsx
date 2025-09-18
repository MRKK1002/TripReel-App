import React, { useEffect } from "react";
import { Image, View, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Slider"); // redirect after splash
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#1b2b51' }}>
         <StatusBar
           barStyle="light-content"
           backgroundColor="#1b2b51"  // black status bar
           translucent={false}     // content stays below
         />
      <View className="items-center justify-center flex-1 bg-white">
        <Image
          source={require("../assets/logo_new_bg.png")}
          style={{
            width: width * 0.8, // 60% of screen width
            height: width * 0.8, // maintain square ratio
            resizeMode: "contain",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
