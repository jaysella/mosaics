import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error(`No LIVEBLOCKS_SECRET_KEY.}`);
}

const client = createClient({
  publicApiKey: process.env.LIVEBLOCKS_SECRET_KEY,
});

type Presence = {
  isTyping: boolean;
};

type Storage = {
  questions: LiveList<{ speaker: string; text: string; from: string }>;
  status: LiveObject<{ open: boolean }>;
};

export const {
  suspense: { RoomProvider },
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useBroadcastEvent,
} = createRoomContext<Presence, Storage>(client);
