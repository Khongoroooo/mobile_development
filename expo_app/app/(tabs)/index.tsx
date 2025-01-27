import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [seconds, setSeconds] = useState(0); // Хугацааг хадгалах
  const [isRunning, setIsRunning] = useState(false); // Таймер ажиллаж байгаа эсэхийг хадгалах

  // Таймерын ажиллагаа
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval); // Таймер зогссон үед зогсоох
    }

    // Компонент устах үед interval-г цэвэрлэх
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning); // Start/Stop хүлээж авах
  };

  const handleReset = () => {
    setIsRunning(false); // Таймер зогсоох
    setSeconds(0); // Хугацааг дахин 0 болгох
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 50, marginBottom: 20 }}>
        {seconds}s
      </Text>
      <Button 
        title={isRunning ? "Stop" : "Start"} 
        onPress={handleStartStop} 
      />
      <Button 
        title="Reset" 
        onPress={handleReset} 
        style={{ marginTop: 20 }} 
      />
    </View>
  );
}
