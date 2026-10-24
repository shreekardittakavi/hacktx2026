import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { Avatar } from '@/components/Avatar';
import { colors, radii } from '@/constants/theme';
import { images } from '@/data/mock';

const circles = [
  {
    name: 'Midnight Runners',
    detail: '2 friends joined · Austin',
    image: images.city,
    accent: colors.blue,
  },
  {
    name: 'Sunday Table',
    detail: 'Food, strangers, long conversations',
    image: images.dinner,
    accent: colors.orange,
  },
  {
    name: 'Make Bad Art',
    detail: '1 open challenge · 43 members',
    image: images.studio,
    accent: colors.pink,
  },
];

export default function DiscoverScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <AppHeader action="⌕" eyebrow="FIND YOUR NEXT THING" title="Discover" />

          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={styles.searchText}>People, circles, moments, places</Text>
          </View>

          <ImageBackground imageStyle={styles.heroImage} source={{ uri: images.concert }} style={styles.hero}>
            <View style={styles.scrim} />
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>CROSSING COMMUNITIES</Text>
            </View>
            <View style={styles.heroCopy}>
              <Text style={styles.heroKicker}>A RIPPLE NEAR YOU</Text>
              <Text style={styles.heroTitle}>One disposable camera. Seven Austin circles.</Text>
              <View style={styles.heroFooter}>
                <View style={styles.facePile}>
                  {[images.portraitOne, images.portraitThree, images.portraitTwo].map((image, index) => (
                    <View key={image} style={[styles.face, { marginLeft: index === 0 ? 0 : -8 }]}>
                      <Image source={{ uri: image }} style={styles.faceImage} />
                    </View>
                  ))}
                </View>
                <Text style={styles.heroMeta}>212 people added to this</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionKicker}>PEOPLE, NOT CONTENT</Text>
              <Text style={styles.sectionTitle}>Circles you could belong in</Text>
            </View>
            <Text style={styles.seeAll}>See all</Text>
          </View>

          <View style={styles.circleList}>
            {circles.map((circle) => (
              <Pressable key={circle.name} style={styles.circleCard}>
                <Avatar group image={circle.image} label={circle.name} size={54} />
                <View style={styles.circleCopy}>
                  <Text style={styles.circleName}>{circle.name}</Text>
                  <Text style={styles.circleDetail}>{circle.detail}</Text>
                  <View style={[styles.match, { backgroundColor: circle.accent }]}>
                    <Text style={styles.matchText}>Muse match · 92%</Text>
                  </View>
                </View>
                <Text style={styles.circleArrow}>›</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.promptCard}>
            <Text style={styles.promptOrb}>✦</Text>
            <View style={styles.promptCopy}>
              <Text style={styles.promptTitle}>Try a stranger route</Text>
              <Text style={styles.promptBody}>
                Let Muse take you three circles outside your usual feed.
              </Text>
            </View>
            <Text style={styles.promptArrow}>→</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleArrow: {
    color: colors.subtle,
    fontSize: 28,
  },
  circleCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.medium,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 13,
  },
  circleCopy: {
    flex: 1,
    marginLeft: 12,
  },
  circleDetail: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
  },
  circleList: {
    gap: 10,
    paddingHorizontal: 16,
  },
  circleName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  content: {
    paddingBottom: 100,
  },
  face: {
    borderColor: colors.white,
    borderRadius: 16,
    borderWidth: 2,
    height: 32,
    overflow: 'hidden',
    width: 32,
  },
  faceImage: {
    height: '100%',
    width: '100%',
  },
  facePile: {
    flexDirection: 'row',
  },
  hero: {
    height: 390,
    justifyContent: 'flex-end',
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    padding: 18,
  },
  heroBadge: {
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'absolute',
    top: 14,
  },
  heroBadgeText: {
    color: colors.black,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  heroCopy: {
    gap: 8,
  },
  heroFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
    marginTop: 6,
  },
  heroImage: {
    borderRadius: radii.large,
  },
  heroKicker: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  heroMeta: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 33,
    maxWidth: 330,
  },
  match: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  matchText: {
    color: colors.black,
    fontSize: 8,
    fontWeight: '900',
  },
  page: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%',
  },
  promptArrow: {
    color: colors.accent,
    fontSize: 22,
  },
  promptBody: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },
  promptCard: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: radii.medium,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 18,
    padding: 14,
  },
  promptCopy: {
    flex: 1,
    marginHorizontal: 12,
  },
  promptOrb: {
    color: colors.accent,
    fontSize: 23,
  },
  promptTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.34)',
  },
  searchBar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  searchIcon: {
    color: colors.text,
    fontSize: 19,
  },
  searchText: {
    color: colors.subtle,
    fontSize: 13,
  },
  sectionHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionKicker: {
    color: colors.accent,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.4,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 4,
  },
  seeAll: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
});
