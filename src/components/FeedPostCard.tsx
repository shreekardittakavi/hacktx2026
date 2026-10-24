import { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Avatar } from '@/components/Avatar';
import { colors, radii } from '@/constants/theme';
import type { FeedPost } from '@/data/mock';

type FeedPostCardProps = {
  post: FeedPost;
};

function compactNumber(value: number) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passed, setPassed] = useState(false);
  const [perspectiveIndex, setPerspectiveIndex] = useState(0);

  const activePerspective = post.perspectives?.[perspectiveIndex];
  const activeImage = activePerspective?.image ?? post.image;
  const likeCount = post.likes + (liked ? 1 : 0);
  const perspectiveLabel = useMemo(
    () =>
      activePerspective
        ? `${activePerspective.author} · ${activePerspective.note}`
        : null,
    [activePerspective],
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.identity}>
          <Avatar group image={post.avatar} label={post.account} size={42} />
          <View style={styles.identityCopy}>
            <View style={styles.accountRow}>
              <Text style={styles.account}>{post.account}</Text>
              <View style={styles.groupPill}>
                <Text style={styles.groupPillText}>GROUP</Text>
              </View>
            </View>
            <Text style={styles.location}>{post.location}</Text>
          </View>
        </View>
        <Pressable style={styles.more}>
          <Text style={styles.moreText}>•••</Text>
        </Pressable>
      </View>

      <ImageBackground
        imageStyle={styles.imageRadius}
        source={{ uri: activeImage }}
        style={styles.hero}>
        <View style={styles.heroScrim} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{post.badge}</Text>
        </View>

        {post.perspectives ? (
          <View style={styles.perspectivePanel}>
            <Text numberOfLines={2} style={styles.perspectiveCopy}>
              {perspectiveLabel}
            </Text>
            <View style={styles.thumbnailRow}>
              {post.perspectives.map((perspective, index) => (
                <Pressable
                  key={perspective.author}
                  onPress={() => setPerspectiveIndex(index)}
                  style={[
                    styles.thumbnailButton,
                    index === perspectiveIndex && styles.thumbnailActive,
                  ]}>
                  <Image
                    source={{ uri: perspective.image }}
                    style={styles.thumbnail}
                  />
                </Pressable>
              ))}
              <View style={styles.morePerspectives}>
                <Text style={styles.morePerspectivesText}>+5</Text>
              </View>
            </View>
          </View>
        ) : null}

        {post.ripple ? (
          <View style={styles.ripplePanel}>
            <View style={styles.rippleNodes}>
              {post.ripple.map((circle, index) => (
                <View key={circle} style={styles.rippleNodeRow}>
                  <View
                    style={[
                      styles.rippleNode,
                      index === post.ripple!.length - 1 && styles.rippleNodeLast,
                    ]}>
                    <Text style={styles.rippleNodeText}>{index + 1}</Text>
                  </View>
                  {index < post.ripple!.length - 1 ? (
                    <View style={styles.rippleLine} />
                  ) : null}
                </View>
              ))}
            </View>
            <Text style={styles.rippleCopy}>
              {passed
                ? 'You passed this into your circle.'
                : 'Passed from No Context to 3 new communities.'}
            </Text>
          </View>
        ) : null}
      </ImageBackground>

      <View style={styles.actions}>
        <View style={styles.actionGroup}>
          <Pressable
            accessibilityLabel="Like post"
            onPress={() => setLiked((value) => !value)}
            style={styles.actionButton}>
            <Text style={[styles.actionIcon, liked && styles.liked]}>
              {liked ? '♥' : '♡'}
            </Text>
            <Text style={styles.actionCount}>{compactNumber(likeCount)}</Text>
          </Pressable>
          <Pressable style={styles.actionButton}>
            <Text style={styles.actionIcon}>◯</Text>
            <Text style={styles.actionCount}>{post.comments}</Text>
          </Pressable>
          <Pressable
            onPress={() => setPassed((value) => !value)}
            style={[styles.passButton, passed && styles.passButtonActive]}>
            <Text style={[styles.passIcon, passed && styles.passTextActive]}>↗</Text>
            <Text style={[styles.passText, passed && styles.passTextActive]}>
              {passed ? 'Passed' : 'Pass on'}
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => setSaved((value) => !value)}>
          <Text style={[styles.saveIcon, saved && styles.saved]}>
            {saved ? '◆' : '◇'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.caption}>
        <Text style={styles.captionAccount}>{post.account} </Text>
        {post.caption}
      </Text>
      <Text style={styles.contextLink}>
        {post.kind === 'moment'
          ? 'Explore all perspectives →'
          : post.kind === 'ripple'
            ? 'See how the ripple moved →'
            : 'Made together with Muse ✦'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  account: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  accountRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  actionCount: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
  },
  actionGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 18,
  },
  actionIcon: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 26,
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    paddingTop: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(10,10,12,0.8)',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: radii.pill,
    borderWidth: 1,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    position: 'absolute',
    top: 12,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  caption: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    paddingTop: 10,
  },
  captionAccount: {
    fontWeight: '800',
  },
  card: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 22,
  },
  contextLink: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 8,
  },
  groupPill: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  groupPillText: {
    color: colors.accent,
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 14,
  },
  hero: {
    aspectRatio: 0.86,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    width: '100%',
  },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  identity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  identityCopy: {
    gap: 3,
  },
  imageRadius: {
    borderRadius: radii.large,
  },
  liked: {
    color: colors.pink,
  },
  location: {
    color: colors.muted,
    fontSize: 11,
  },
  more: {
    padding: 8,
  },
  morePerspectives: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  morePerspectivesText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  moreText: {
    color: colors.muted,
    fontSize: 15,
    letterSpacing: 2,
  },
  passButton: {
    alignItems: 'center',
    borderColor: colors.border,
    borderRadius: radii.pill,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  passButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  passIcon: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  passText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  passTextActive: {
    color: colors.black,
  },
  perspectiveCopy: {
    color: colors.white,
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    maxWidth: 180,
  },
  perspectivePanel: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(10,10,12,0.74)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    borderWidth: 1,
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 12,
    padding: 10,
    position: 'absolute',
    right: 12,
  },
  rippleCopy: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
  rippleLine: {
    backgroundColor: colors.accent,
    height: 2,
    width: 34,
  },
  rippleNode: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.accent,
    borderRadius: 14,
    borderWidth: 2,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  rippleNodeLast: {
    backgroundColor: colors.accent,
  },
  rippleNodeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rippleNodeText: {
    color: colors.white,
    fontSize: 9,
    fontWeight: '900',
  },
  rippleNodes: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  ripplePanel: {
    backgroundColor: 'rgba(10,10,12,0.8)',
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    borderWidth: 1,
    bottom: 12,
    left: 12,
    padding: 14,
    position: 'absolute',
    right: 12,
  },
  saveIcon: {
    color: colors.text,
    fontSize: 24,
  },
  saved: {
    color: colors.accent,
  },
  thumbnail: {
    borderRadius: 15,
    height: 30,
    width: 30,
  },
  thumbnailActive: {
    borderColor: colors.accent,
  },
  thumbnailButton: {
    borderColor: 'transparent',
    borderRadius: 19,
    borderWidth: 2,
    padding: 1,
  },
  thumbnailRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
});
