import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from './context/ThemeContext';

function LayoutWithTheme() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} backgroundColor={theme.colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="class-directory" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutWithTheme />
    </ThemeProvider>
  );
}
