src/
│
├── app/ # Expo Router hoặc navigation root
│
├── features/
│ ├── auth/
│ │ ├── screens/
│ │ │ ├── LoginScreen.tsx
│ │ │ └── RegisterScreen.tsx
│ │ ├── components/
│ │ │ └── AuthInput.tsx
│ │ ├── services/
│ │ │ └── auth.api.ts
│ │ ├── hooks/
│ │ │ └── useAuth.ts
│ │ ├── types.ts
│ │ └── index.ts
│ │
│ ├── home/
│ │ ├── screens/
│ │ │ └── HomeScreen.tsx
│ │ ├── components/
│ │ ├── services/
│ │ └── index.ts
│ │
│ ├── profile/
│ │ ├── screens/
│ │ │ └── ProfileScreen.tsx
│ │ ├── components/
│ │ └── index.ts
│
├── shared/
│ ├── components/ # Button, Input, Modal dùng chung
│ ├── hooks/
│ ├── utils/
│ ├── constants/
│ └── types/
│
├── navigation/
│ └── RootNavigator.tsx
│
└── services/ # axios config, api base
