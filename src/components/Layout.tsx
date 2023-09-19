import { ReactNode } from "react";
import NextLink from "next/link";
import { Box, Button, CounterLabel, Text } from "@primer/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CodeIcon, IssueOpenedIcon, BookIcon, PlayIcon  } from "@primer/octicons-react"
import { UnderlineNav2 } from "@primer/react";

interface LayoutProps {
  children: ReactNode;
}

interface Page {
  name: string;
  path: string;
}

// add your navigation items here
const pages: Page[] = [
  { name: "Home", path: "/" },
  { name: "Solved", path: "/solved" },
  { name: "Library", path: "/library" },
  { name: "Playground", path: "/playground" },
];

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navigation />
      <Box p={3}>{children}</Box>
    </>
  );
}

function Navigation() {
  const router = useRouter();
  const activePath = router.pathname;


  const icons = [CodeIcon , IssueOpenedIcon, BookIcon, PlayIcon  ]

  return (
    <Box
      as="nav"
      display="flex"
      p={3}
      height={56}
      alignItems="center"
      justifyContent={"space-between"}
      width="100%"
      position="sticky"
      top="0"
      sx={{
        borderBottom: "1px solid",
        borderColor: "border.muted",
        bg: "canvas.default",
      }}
    >
      <Box as="ul" display="flex" sx={{ alignItems: "center" }}>
        <Box as="li" sx={{ listStyle: "none" }}>
          <Text
            fontSize={2}
            fontWeight="bold"
            color="fg.default"
            pr={3}
            mr={1}
            sx={{ borderRight: "1px solid", borderColor: "border.muted" }}
          >
            Theorem Prover
          </Text>
        </Box>
        {pages.map((page, idx) => (
          <Box as="li" sx={{ listStyle: "none" }} key={page.path}>
            <NextLink href={page.path} passHref legacyBehavior >
              <Button
                
                leadingIcon={icons[idx]}
                variant="invisible"
                as="a"
                sx={{
                  textDecoration: activePath === page.path ? "underline" : "none",
                 
                  justifyItems: 'around',
                  color: activePath === page.path ? "fg.accent" : "fg.default",
                }}
              >
                 {page.name}
                {idx == 1 && <CounterLabel sx={{ marginLeft:"4px"}}  scheme="secondary" >12</CounterLabel>} 
              
              </Button>
            </NextLink>
          </Box>
        ))}
      </Box>
      <Authentication />
    </Box>
  );
}

function Authentication() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <Button variant="primary" onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }

  return (
    <Button variant="primary" onClick={() => signIn("github")}>
      Sign in
    </Button>
  );
}
