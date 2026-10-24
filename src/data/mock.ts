export type Story = {
  id: string;
  name: string;
  image: string;
  cover: string;
  isGroup?: boolean;
  label?: string;
};

export type Perspective = {
  author: string;
  image: string;
  note: string;
};

export type FeedPost = {
  id: string;
  account: string;
  handle: string;
  avatar: string;
  location: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  timestamp: string;
  kind: 'moment' | 'ripple' | 'standard';
  badge: string;
  perspectives?: Perspective[];
  ripple?: string[];
};

export type ChatPreview = {
  id: string;
  name: string;
  image: string;
  members: string;
  message: string;
  time: string;
  unread?: number;
  aiActive?: boolean;
};

export const images = {
  apartment:
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=88',
  dinner:
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=88',
  concert:
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=88',
  city:
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=88',
  skate:
    'https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1400&q=88',
  studio:
    'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=1400&q=88',
  portraitOne:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=88',
  portraitTwo:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=88',
  portraitThree:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=88',
  portraitFour:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=88',
  portraitFive:
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=88',
};

export const stories: Story[] = [
  {
    id: '1',
    name: 'APT 304',
    image: images.apartment,
    cover: images.dinner,
    isGroup: true,
    label: 'DROP',
  },
  {
    id: '2',
    name: 'Maya',
    image: images.portraitOne,
    cover: images.city,
  },
  {
    id: '3',
    name: 'Film Club',
    image: images.concert,
    cover: images.concert,
    isGroup: true,
    label: 'LIVE',
  },
  {
    id: '4',
    name: 'Noah',
    image: images.portraitThree,
    cover: images.skate,
  },
  {
    id: '5',
    name: 'Studio 8',
    image: images.studio,
    cover: images.studio,
    isGroup: true,
  },
  {
    id: '6',
    name: 'Sasha',
    image: images.portraitTwo,
    cover: images.dinner,
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: 'moment-dinner',
    account: 'East Side Table',
    handle: '@eastsidetable',
    avatar: images.dinner,
    location: 'Austin · 22 minutes ago',
    caption:
      'Twelve strangers, one impossibly long table, and apparently three people who brought the same dessert.',
    image: images.dinner,
    likes: 1834,
    comments: 96,
    timestamp: '22m',
    kind: 'moment',
    badge: 'MOMENT STACK · 8 PERSPECTIVES',
    perspectives: [
      {
        author: 'The hosts',
        image: images.dinner,
        note: 'The table before anyone knew anyone.',
      },
      {
        author: 'Maya',
        image: images.apartment,
        note: 'The exact moment the group chat became real life.',
      },
      {
        author: 'Jonah',
        image: images.city,
        note: 'The walk home after staying two hours too long.',
      },
    ],
  },
  {
    id: 'ripple-skate',
    account: 'No Context Club',
    handle: '@nocontext',
    avatar: images.skate,
    location: 'UT Austin · Yesterday',
    caption:
      'We challenged another group to teach us something in 20 minutes. They chose falling with confidence.',
    image: images.skate,
    likes: 7421,
    comments: 311,
    timestamp: '1d',
    kind: 'ripple',
    badge: 'RIPPLE · CROSSING 4 CIRCLES',
    ripple: ['No Context', 'Campus Skate', 'West Hall', 'Austin After Dark'],
  },
  {
    id: 'standard-studio',
    account: 'Studio 8',
    handle: '@studioeight',
    avatar: images.studio,
    location: 'Public drop · 2 days ago',
    caption:
      'We each recorded twenty seconds about the same night. Muse cut the contradictions into one tiny film.',
    image: images.studio,
    likes: 3012,
    comments: 208,
    timestamp: '2d',
    kind: 'standard',
    badge: 'GROUP DROP · 6 CONTRIBUTORS',
  },
];

export const chats: ChatPreview[] = [
  {
    id: 'apt-304',
    name: 'APT 304',
    image: images.apartment,
    members: '5 friends + Muse',
    message: 'Muse made a draft from last night 👀',
    time: '2m',
    unread: 3,
    aiActive: true,
  },
  {
    id: 'film-club',
    name: 'Film Club',
    image: images.concert,
    members: '12 members',
    message: 'Maya: this is absolutely our next theme',
    time: '18m',
    unread: 1,
  },
  {
    id: 'sunday-table',
    name: 'Sunday Table',
    image: images.dinner,
    members: '8 friends + Muse',
    message: 'Jonah shared 4 new photos',
    time: '1h',
    aiActive: true,
  },
  {
    id: 'studio-8',
    name: 'Studio 8',
    image: images.studio,
    members: '6 creators',
    message: 'Your group drop is live',
    time: '3h',
  },
];
