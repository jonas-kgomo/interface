import { SetStateAction, useState } from "react"
import { CircleBadge, Tooltip,Button, TreeView } from "@primer/react"
import { FileIcon, IssueOpenedIcon, FeedHeartIcon, FeedIssueDraftIcon, FileBinaryIcon, FeedPullRequestOpenIcon } from "@primer/octicons-react"

interface ListViewLiteProps {
  args: any;
  stateParams: any;
  itemList: any; 
  setSelectedFile: any
}

export default function ListViewLite({ args, stateParams, itemList, setSelectedFile }: ListViewLiteProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [asyncItems, setAsyncItems] = useState<string[]>([])
  const [selected, setSelected] = useState<any>();

  let state = stateParams.initialState;
  if (isLoading) {
    state = stateParams.loadingState;
  } else if (asyncItems.length > 0) {
    state = stateParams.doneState;
  }

  setSelectedFile(selected);
 
  async function loadItems(responseTime: number): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = itemList;
        resolve(items);
      }, responseTime);
    });
  }
 
  

  return (
    <div >
      <TreeView
       aria-label="Files">
        <TreeView.Item 
      
       
        id="file-1">
          <TreeView.LeadingVisual>
            <FeedIssueDraftIcon />
          </TreeView.LeadingVisual>
       <div  style={{ maxHeight: "600px", overflowY: "auto", position: "sticky", top: 0 }}>
       {selected?.split('.')[0].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/(\d+)/g, ' $1')}
         
       </div>
        
        
              </TreeView.Item>
        <TreeView.Item
     id="async-directory"
          onExpandedChange={async (isExpanded) => {
            if (asyncItems.length === 0 && isExpanded) {
              setIsLoading(true)

              // Load items
              const items = await loadItems(args.responseTime)
              setIsLoading(false)
              setAsyncItems(items)
            }
          }}
        >
          <TreeView.LeadingVisual>
            <IssueOpenedIcon />
          </TreeView.LeadingVisual>  
        Directory of Theorems   
      
          <TreeView.SubTree 
          state={state}
          >
            <div 
style={{ maxHeight: "600px", overflowY: "auto" }}>
  {asyncItems.map((item) => (
              <TreeView.Item
              
     
              id={`item-${item}`} key={item} onSelect={()=> setSelected(item)}>
                <TreeView.LeadingVisual>
                  <FileIcon /> 
                </TreeView.LeadingVisual>
                {item}
              </TreeView.Item>
            ))}
            </div>
          
          </TreeView.SubTree>
        </TreeView.Item>
        <TreeView.Item id="another-file">
          <TreeView.LeadingVisual>
            <FileBinaryIcon />
          </TreeView.LeadingVisual>
          Finished
        </TreeView.Item>
      </TreeView>
    </div>
  )
}