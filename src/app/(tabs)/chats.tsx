import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/AppHeader';
import { Avatar } from '@/components/Avatar';
import { colors, radii } from '@/constants/theme';
import { chats } from '@/data/mock';

export default function ChatsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <AppHeader action="＋" eyebrow="YOUR INNER CIRCLES" title="Chats" />

          <View style={styles.search}>
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={styles.searchText}>Search conversations</Text>
          </View>

          <View style={styles.aiBanner}>
            <View style={styles.aiIcon}>
              <Text style={styles.aiIconText}>✦</Text>
            </View>
            <View style={styles.aiCopy}>
              <Text style={styles.aiTitle}>Muse has two ideas for tonight</Text>
              <Text style={styles.aiBody}>A game for Film Club and a recap for APT 304.</Text>
            </View>
            <Text style={styles.aiArrow}>›</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Messages</Text>
            <Text style={styles.sectionAction}>Requests · 2</Text>
          </View>

          <View style={styles.chatList}>
            {chats.map((chat) => (
              <Link
                key={chat.id}
                asChild
                href={{ pathname: '/chat/[id]', params: { id: chat.id } }}>
                <Pressable style={({ pressed }) => [styles.chat, pressed && styles.pressed]}>
                  <View>
                    <Avatar group image={chat.image} label={chat.name} size={58} />
                    {chat.aiActive ? (
                      <View style={styles.aiStatus}>
                        <Text style={styles.aiStatusText}>✦</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.chatCopy}>
                    <View style={styles.chatTitleRow}>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatTime}>{chat.time}</Text>
                    </View>
                    <Text style={styles.chatMembers}>{chat.members}</Text>
                    <View style={styles.messageRow}>
                      <Text numberOfLines={1} style={styles.chatMessage}>
                        {chat.message}
                      </Text>
                      {chat.unread ? (
                        <View style={styles.unread}>
                          <Text style={styles.unreadText}>{chat.unread}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  aiArrow: {
    color: colors.accent,
    fontSize: 25,
  },
  aiBanner: {
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.accent,
    borderRadius: radii.medium,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 13,
  },
  aiBody: {
    color: colors.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },
  aiCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  aiIcon: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  aiIconText: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '900',
  },
  aiStatus: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderColor: colors.background,
    borderRadius: 9,
    borderWidth: 2,
    bottom: -1,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: -1,
    width: 18,
  },
  aiStatusText: {
    color: colors.black,
    fontSize: 9,
    fontWeight: '900',
  },
  aiTitle: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '800',
  },
  chat: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chatCopy: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 12,
    paddingBottom: 14,
  },
  chatList: {
    gap: 0,
  },
  chatMembers: {
    color: colors.subtle,
    fontSize: 9,
    marginTop: 2,
  },
  chatMessage: {
    color: colors.muted,
    flex: 1,
    fontSize: 12,
  },
  chatName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  chatTime: {
    color: colors.subtle,
    fontSize: 10,
  },
  chatTitleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    paddingBottom: 100,
  },
  messageRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 7,
  },
  page: {
    alignSelf: 'center',
    maxWidth: 560,
    width: '100%',
  },
  pressed: {
    backgroundColor: colors.surface,
  },
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  search: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    flexDirection: 'row',
    gap: 9,
    marginHorizontal: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    color: colors.text,
    fontSize: 18,
  },
  searchText: {
    color: colors.subtle,
    fontSize: 12,
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
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 24,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  unread: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    paddingHorizontal: 4,
  },
  unreadText: {
    color: colors.black,
    fontSize: 9,
    fontWeight: '900',
  },
});
