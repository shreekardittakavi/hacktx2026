import { DarkTheme, Stack, ThemeProvider } from 'expo-router';

import { colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <ThemeProvider
      value={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: colors.background,
          card: colors.surface,
          primary: colors.accent,
        },
      }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
