@echo off
echo [TripReel] Starting Metro bundler (WiFi mode - no adb reverse needed)...
echo [TripReel] Make sure phone and PC are on the same WiFi network
echo [TripReel] Backend URL: http://192.168.1.18:5000
npx react-native start --reset-cache
