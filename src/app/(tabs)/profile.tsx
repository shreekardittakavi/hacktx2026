import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '@/components/Avatar';
import { colors, radii } from '@/constants/theme';
import { images } from '@/data/mock';

const grid = [images.apartment, images.city, images.dinner, images.skate, images.concert, images.studio];

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <View style={styles.topBar}>
            <Text style={styles.handle}>@maya</Text>
            <View style={styles.topActions}>
              <Text style={styles.topAction}>＋</Text>
              <Text style={styles.topAction}>☰</Text>
            </View>
          </View>

          <View style={styles.profileHeader}>
            <Avatar image={images.portraitOne} label="Maya" size={84} />
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>38</Text>
                <Text style={styles.statLabel}>moments</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>6</Text>
                <Text style={styles.statLabel}>circles</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>ripples</Text>
              </View>
            </View>
          </View>

          <View style={styles.bio}>
            <Text style={styles.name}>Maya Chen</Text>
            <Text style={styles.bioText}>Making tiny films, feeding too many people, collecting very specific stories.</Text>
            <Text style={styles.location}>Austin · UT ’27</Text>
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </Pressable>
            <Pressable style={styles.shareButton}>
              <Text style={styles.shareButtonText}>↗</Text>
            </Pressable>
          </View>

          <View style={styles.circleSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your circles</Text>
              <Text style={styles.sectionAction}>Manage</Text>
            </View>
            <ScrollView contentContainerStyle={styles.circleRail} horizontal showsHorizontalScrollIndicator={false}>
              {[
                ['APT 304', images.apartment],
                ['Studio 8', images.studio],
                ['Sunday Table', images.dinner],
              ].map(([name, image]) => (
                <View key={name} style={styles.circleItem}>
                  <Avatar group image={image} label={name} size={58} />
                  <Text numberOfLines={1} style={styles.circleName}>{name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.gridTabs}>
            <Text style={styles.gridTabActive}>▦ Moments</Text>
            <Text style={styles.gridTab}>↗ Ripples</Text>
            <Text style={styles.gridTab}>◇ Saved</Text>
          </View>
          <View style={styles.grid}>
            {grid.map((image, index) => (
              <View key={`${image}-${index}`} style={styles.gridCell}>
                <Image source={{ uri: image }} style={styles.gridImage} />
                {index === 0 || index === 4 ? (
                  <View style={styles.stackBadge}>
                    <Text style={styles.stackBadgeText}>▦</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bio: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  bioText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    maxWidth: 390,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  circleItem: {
    alignItems: 'center',
    gap: 7,
    width: 72,
  },
  circleName: {
    color: colors.muted,
    fontSize: 9,
    fontWeight: '700',
    maxWidth: 72,
  },
  circleRail: {
    gap: 12,
    paddingHorizontal: 16,
  },
  circleSection: {
    paddingTop: 20,
  },
  content: {
    paddingBottom: 100,
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: radii.small,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 11,
  },
  editButtonText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridCell: {
    aspectRatio: 1,
    position: 'relative',
    width: '33%',
  },
  gridImage: {
    height: '100%',
    width: '100%',
  },
  gridTab: {
    color: colors.subtle,
    fontSize: 10,
    fontWeight: '800',
  },
  gridTabActive: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '900',
  },
  gridTabs: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 22,
    paddingBottom: 12,
  },
  handle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  location: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  page: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  sectionAction: {
    color: colors.accent,
    fontSize: 10,
    fontWeight: '800',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  shareButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: radii.small,
    borderWidth: 1,
    justifyContent: 'center',
    width: 46,
  },
  shareButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  stackBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.62)',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    position: 'absolute',
    right: 7,
    top: 7,
    width: 22,
  },
  stackBadgeText: {
    color: colors.white,
    fontSize: 11,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 2,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 18,
  },
  statValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  topAction: {
    color: colors.text,
    fontSize: 22,
  },
  topActions: {
    flexDirection: 'row',
    gap: 18,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
