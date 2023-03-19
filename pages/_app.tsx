import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RoomProvider } from "@/liveblocks.config";
import "@/styles/globals.css";
import "@/styles/SpeakerSelect.css";
import "@/styles/Toast.css";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mosaics Q&A</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RoomProvider
        id="mosaics"
        initialPresence={{ isTyping: false }}
        initialStorage={{
          questions: new LiveList(),
          status: new LiveObject({ open: false }),
        }}
      >
        <ClientSideSuspense
          fallback={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              Loading...
            </div>
          }
        >
          {() => <Component {...pageProps} />}
        </ClientSideSuspense>
      </RoomProvider>

      <Footer />

      <Toaster />
    </>
  );
}
