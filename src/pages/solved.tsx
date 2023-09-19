import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { BookIcon } from "@primer/octicons-react"
import { Box } from "@primer/react";
import { Blankslate } from "@primer/react/drafts";
 
interface QueryResponse {
  viewer: {
    repositories: {
      nodes: {
        name: string; 
      }[];
    };
  };
}

export default function Home() {
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<any[]>([]);
  const [client, setClient] = useState<Octokit>();

  useEffect(() => {
    if (data?.accessToken) {
      setClient(
        new Octokit({
          auth: data.accessToken,
        })
      );
      setLoading(false);
    }
  }, [data]);

  const getFollowers = useCallback(async () => {
    const query = `
      query {
        viewer {
          repositories(first: 10) {
            nodes {
              name 
            }
          }
        }
      }
    `;
    const response = await client?.graphql<QueryResponse>(query);
    const viewer = response?.viewer;
    if (viewer) setFollowers(viewer.repositories.nodes);
  }, [client])

  useEffect(() => {
    if (client) {
      getFollowers();
    }
  }, [client, getFollowers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<div> 
<Blankslate>
    <Blankslate.Visual>
      <BookIcon size="medium" />
    </Blankslate.Visual>
    <Blankslate.Heading>Welcome to the Theorem Wiki!</Blankslate.Heading>
    <Blankslate.Description>
      This provide a place for your explored theorems to lay out the roadmap of your
      moves, shows  the history of your files as well.
    </Blankslate.Description>
    <Blankslate.PrimaryAction href="playground">
      Create the first page
    </Blankslate.PrimaryAction>
    <Blankslate.SecondaryAction href="library">
      Learn more about wikis
    </Blankslate.SecondaryAction>
  </Blankslate>
</div>
   

  
  );
}
