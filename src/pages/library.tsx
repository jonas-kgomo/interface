import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";  

import {
  Box,
  Text,
  Link,
  StyledOcticon,
  PageLayout,
  NavList,
} from "@primer/react";
import ListViewLite from "@/components/ListViewLite";


interface QueryResponse {
  repository: {
    object: {
      entries: {
        name: string;
        type: string;
      }[];
    };
    
  };
}


interface FileResponse {
  repository: {
    object: {
      text: any
    };
  };
}




export default function Home() {
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<any[]>([]);
  const [client, setClient] = useState<Octokit>();
  const [selected, setSelected] = useState<any>();
  const [content, setContent] = useState<any>(); 
  
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

  const getFiles = useCallback(async () => {
    const query = `
      query {
        repository(owner: "wbhart", name: "gofai") {
          object(expression: "master:tptp") {
            ... on Tree {
              entries {
                name
                type
              }
            }
          }
        }
      }
    `;

    const response = await client?.graphql<QueryResponse>(query);
    const repository = response?.repository;
    if (repository) {
      setFiles(repository.object.entries);
        }


        const fileQuery = `
        query {
          repository(owner: "wbhart", name: "gofai") {
            object(expression: "master:tptp/${selected}") {
              ... on Blob {
                text
              }
            }
          }
        }
      `;
      const fileResponse = await client?.graphql<FileResponse>(fileQuery);
      const fileObject = fileResponse?.repository?.object;
      if (fileObject) {
        const fileText = fileObject.text;
        // Do something with the file text
        setContent(fileText);
      }
      

  }, [client, selected])

  useEffect(() => {
    if (client) {
      getFiles();
    }
  }, [client, getFiles]);

  if (loading) {
    return <div>Loading...</div>;
  }
 
  const fileNames = files.map(file => file.name);
 

  return (

    <div>
      <PageLayout containerWidth="xlarge">
        <PageLayout.Pane position="start">
          <Box as="main" sx={{ margin: "0 auto", maxWidth: 1200 }}>
            <ListViewLite setSelectedFile={setSelected} stateParams={true} args={fileNames} itemList={fileNames}/>
          </Box>
        </PageLayout.Pane>

        <PageLayout.Content>
          <Box 
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
          >
            <Box
              maxWidth={800}
              width="100%" 
              minHeight={600}
              bg="neutral.subtle"
              borderRadius={2}
              p={4}
              mb={3}
            >
              <Text>Selected File: {selected}</Text>
              <br/> 
              <code>{content}</code>
              
            </Box>
          </Box>  
        </PageLayout.Content>
      </PageLayout>
    </div>
  );
}

