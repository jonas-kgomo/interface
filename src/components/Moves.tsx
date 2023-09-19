import { Box, Button, Text, Select, TextInput } from "@primer/react"
import { GitMergeQueueIcon, IssueDraftIcon , TriangleDownIcon, ReplyIcon} from "@primer/octicons-react"
import { Popover, Heading, SelectPanel } from "@primer/react"
import { useState } from "react";

export default function Moves(){
    const [isOpen, setIsOpen] = useState(false);

return (
    <div>
<Box borderRadius={2}
p={4} my={4}  bg="neutral.subtle"  color="done">
  
  <Heading   sx={{
          fontSize: 2,
        }}>
Algorithmic Moves
</Heading>
<br/>
<Text id="label" fontFamily="sans-serif">
Possible  moves to explore the proof
</Text>
<Box display="flex" mt={3} overflow={"none"}  > 
    
<Button sx={{m: 1}} leadingIcon={GitMergeQueueIcon} >Expand</Button>
  <Button sx={{m: 1}} leadingIcon={IssueDraftIcon}>Cleanup</Button>
</Box>

<Box display="flex" mt={2} overflow={"none"}  > 
    

<Button variant="outline" leadingIcon={ReplyIcon}>Pollens</Button>
  <Button  sx={{ml: 2}} leadingIcon={IssueDraftIcon}>Tollens</Button>
</Box>

</Box>




<Box borderRadius={2} p={4} my={4}   color="done">
<MultiSelect/>
</Box>


<Box borderRadius={2} p={4} my={4} bg="neutral.subtle" color="done">
  <Button 
  onClick={()=>setIsOpen(true)}
  >Library Statements</Button>
 
  <Popover relative open={isOpen} >
    <Popover.Content
      sx={{
        marginTop: 2,
      }}
    >
      <Heading
        sx={{
          fontSize: 2,
        }}
      >
        Popover heading
      </Heading>
      <Text as="p">Message about popovers</Text>
      <Button 
        onClick={()=>setIsOpen(false)}
        >Got it!</Button>
    </Popover.Content>
  </Popover>
 
</Box>



 

</div>)
}



type ItemInput = any;
const items = [{
    background: 'accent.emphasis',
    text: 'enhancement',
    id: 1
  }, {
    background: 'neutral.subtle',
    text: 'bug',
    id: 2
  }, {
    background: 'neutral.subtle',
    text: 'good first issue',
    id: 3
  }, {
    background: 'severe.sutle',
    text: 'design',
    id: 4
  }, {
    background: 'accent.subtle',
    text: 'blocker',
    id: 5
  }, {
    background:'severe.sutle',
    text: 'backend',
    id: 6
  }, {
    background: 'severe.sutle',
    text: 'frontend',
    id: 7
  }];

function MultiSelect() {

   
      const [selected, setSelected] = useState<ItemInput[]>([
        items[0],
        items[1]
      ])
    // const [selected, setSelected] = useState<ItemInput>(['theorem', 'lemma', 'conjecture']);
    const [filter, setFilter] =  useState('')
    const filteredItems = items.filter((item) =>
    item.text?.toLowerCase().startsWith(filter.toLowerCase()),
  )
    const [open, setOpen] = useState(false)
    return (
      <>
         <Heading   sx={{
          fontSize: 2,
        }}>
Tags
</Heading>
        <SelectPanel
          title="Select labels"
          subtitle="Use labels to organize issues and pull requests"
          renderAnchor={({
            children,
            'aria-labelledby': ariaLabelledBy,
            ...anchorProps
          }) => (
            <Button
              trailingAction={TriangleDownIcon}
              aria-labelledby={` ${ariaLabelledBy}`}
              {...anchorProps}
            >
                
              {children ?? 'Select Labels'}
            </Button>
          )}
          placeholderText="Filter labels"
          open={open}
          onOpenChange={setOpen}
          items={filteredItems}
          selected={selected}
          onSelectedChange={setSelected}
          onFilterChange={setFilter}
          showItemDividers={true}
          overlayProps={{
            width: 'small',
            height: 'xsmall',
          }}
        />
      </>
    )
  }