import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [seconds, setSeconds] = useState(0);  // Секунд
  const [milliseconds, setMilliseconds] = useState(0);  // Миллисекунд
  const [isRunning, setIsRunning] = useState(false);  // Таймер ажиллаж байгаа эсэх

  // Секундыг цаг, минут, секунд, миллисекунд болгон хөрвүүлэх
  const formatTime = (seconds, milliseconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}:${milliseconds < 10 ? '0' : milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  // Таймерын ажиллагаа
  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          if (prevMilliseconds === 100) {
            setSeconds((prevSeconds) => prevSeconds + 1);
            return 0;
          } else {
            return prevMilliseconds + 1;
          }
        });
      }, 1);  // Миллисекунд нэмэхэд 1 мс-ийн интервал

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
    setIsRunning(false);  // Таймер зогсоох
    setSeconds(0);  // Хугацааг дахин 0 болгох
    setMilliseconds(0);  // Миллисекундийг дахин 0 болгох
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 50, marginBottom: 20 }}>
        {formatTime(seconds, milliseconds)}
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
