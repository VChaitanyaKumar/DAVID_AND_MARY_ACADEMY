import { Stack } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import React from 'react';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Removed Supabase client creation from here

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
    <AuthProvider>
      <ThemeProvider>
        <LayoutWithTheme />
      </ThemeProvider>
    </AuthProvider>
  );
}
