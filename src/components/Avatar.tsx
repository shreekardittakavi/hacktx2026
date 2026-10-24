import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

type AvatarProps = {
  image?: string;
  label: string;
  size?: number;
  ring?: boolean;
  group?: boolean;
};

export function Avatar({
  image,
  label,
  size = 44,
  ring = false,
  group = false,
}: AvatarProps) {
  return (
    <View
      style={[
        styles.wrapper,
        { borderRadius: size / 2, height: size, width: size },
        ring && styles.ring,
        group && styles.groupRing,
      ]}>
      {image ? (
        <Image
          accessibilityLabel={`${label} avatar`}
          source={{ uri: image }}
          style={{ borderRadius: size / 2, height: '100%', width: '100%' }}
        />
      ) : (
        <Text style={[styles.fallback, { fontSize: size * 0.34 }]}>
          {label.slice(0, 2).toUpperCase()}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    color: colors.text,
    fontWeight: '800',
  },
  groupRing: {
    borderColor: colors.accent,
  },
  ring: {
    borderColor: colors.pink,
    borderWidth: 2,
    padding: 2,
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
