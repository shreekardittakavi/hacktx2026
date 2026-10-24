import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

type AppHeaderProps = {
  eyebrow?: string;
  title?: string;
  action?: string;
  onAction?: () => void;
};

export function AppHeader({
  eyebrow = 'THE SOCIAL LAYER',
  title = 'LORE',
  action = '✦',
  onAction,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        accessibilityLabel="Open Muse"
        onPress={onAction}
        style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
        <Text style={styles.actionText}>{action}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 22,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  actionText: {
    color: colors.black,
    fontSize: 21,
    fontWeight: '900',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 2.2,
  },
  pressed: {
    opacity: 0.72,
    transform: [{ scale: 0.96 }],
  },
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -1.4,
  },
});
