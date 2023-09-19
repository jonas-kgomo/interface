import {
  Box,
  Text,
  Link,
  StyledOcticon,
  PageLayout,
  Timeline, Button
} from "@primer/react";
import {
  CheckIcon,
  CommentIcon,
  MortarBoardIcon,  SquirrelIcon
} from "@primer/octicons-react";
import Markdown  from "../components/Markdown" 
import Moves from "@/components/Moves";

export default function Playground() {

  return (
    <PageLayout containerWidth="xlarge">
      


      <PageLayout.Content>

      <Box borderRadius={2}
            p={4} my={4}  bg="neutral.subtle"  color="done">
              
            
            <Text id="label" fontFamily="sans-serif">
              Are you sure want to delete this issue?
            </Text>
            <Box display="flex" mt={3} justifyContent="flex-end">
              <Button sx={{mr: 1}}>Cancel</Button>
              <Button variant="outline">Apply</Button>
            </Box>
          </Box>

          <Markdown/>

        <Box 
          display="flex" 

          height="300px"
        >
          
          <Box
            maxWidth={800}
            width="100%"
            bg="accent.muted"
            color="accent.emphasis"
            borderRadius={2}
            p={4} 
            my={4}

          >
            <CodeLine icon={CheckIcon} iconColor="success.fg">
              Mona&apos;s playground successfully initialised...
            </CodeLine>
            <CodeLine icon={CommentIcon} iconColor="accent.fg">
              Visit <Text color="text.warning">src/pages/index.js</Text> and
              start building your own layouts using Primer.
            </CodeLine>
          </Box>
          <MoveTimeline/>
        </Box>
      </PageLayout.Content>



      <PageLayout.Pane position="end">
        <Moves/>
      </PageLayout.Pane>
      
      <PageLayout.Footer>
        <Box
          py={3}
          mb={3}
          borderTopColor="border.default"
          borderTopWidth={1}
          borderTopStyle="solid"
        >
          <Footer />
        </Box>
      </PageLayout.Footer>
    </PageLayout>
  );
}

interface CodeLineProps {
  icon: any;
  iconColor: string;
  children?: React.ReactNode;
}

function CodeLine({ icon, iconColor, children }: CodeLineProps) {
  return (
    <Box display="flex"   mb={2}>
      <Box display="flex" mt="2px" width={20} minWidth={20}>
        <StyledOcticon icon={icon} size={16} color={iconColor} />
      </Box>
      <Text as="p" fontSize={1} fontFamily="mono" ml={2} sx={{ flex: 1 }}>
        {children}
      </Text>
    </Box>
  );
}

function Footer() {
  return (
    <Box textAlign="center" mb={3}>
      <Box mr={2} display="inline-block">
        <StyledOcticon
          icon={MortarBoardIcon}
          size={16}
          color="attention.fg"
          sx={{ mr: 1 }}
        />
        <Text color="attention.fg">Tip</Text>
      </Box>
      <Text>
        Before you get started check out our{" "}
        <Link href="https://wtgowers.github.io/human-style-atp/" target="_blank">
        Human-Oriented Automatic Theorem Proving
        </Link>
      </Text>
    </Box>
  );
}


function MoveTimeline(){
  return ( 
    <Box   p={3} 
    my={1}   style={{ width: "100px", fontSize:"10px"}}>
  <Timeline >
        <Timeline.Item>
          <Timeline.Badge>
          <SquirrelIcon/>
          </Timeline.Badge>
          <p>First move</p>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Badge>
           2
          </Timeline.Badge>
          <p>Second Move</p>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Badge>
         3
          </Timeline.Badge>
          <p>Final step   </p>
        </Timeline.Item>
      </Timeline>
    </Box>
    
    
  )
}

