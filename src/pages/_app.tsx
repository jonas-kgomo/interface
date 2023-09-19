import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider, BaseStyles, Box } from "@primer/react";

import Layout from "@/components/Layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider colorMode="auto" preventSSRMismatch>
      <BaseStyles>
        <SessionProvider session={session}>
          <Box
            backgroundColor={"canvas.default"}
            minHeight={"100vh"}
            maxWidth={"800px"}  
            width={"100vw"}
            position={"absolute"}
            top={0}
            right={0} 
            left={0}
            margin={"auto"}
            marginY={100}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Box>
        </SessionProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}
