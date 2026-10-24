import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/theme';

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={[styles.icon, focused && styles.iconFocused]}>{label}</Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtle,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="⌂" />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="⌕" />,
          title: 'Discover',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused }) => (
            <Text style={[styles.createIcon, focused && styles.createIconFocused]}>
              ＋
            </Text>
          ),
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="◉" />,
          title: 'Chats',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="◎" />,
          title: 'You',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createIcon: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 18,
    color: colors.black,
    fontSize: 24,
    height: 36,
    lineHeight: 34,
    overflow: 'hidden',
    textAlign: 'center',
    width: 36,
  },
  createIconFocused: {
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.subtle,
    fontSize: 23,
    fontWeight: '500',
  },
  iconFocused: {
    color: colors.accent,
    fontWeight: '900',
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
  },
  tabBar: {
    backgroundColor: '#101013',
    borderTopColor: colors.border,
    height: 72,
    paddingBottom: 10,
    paddingTop: 7,
  },
});
