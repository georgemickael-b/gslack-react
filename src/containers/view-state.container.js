
import { useState } from "react"
import { createContainer } from "unstated-next"

export const ViewType = {
    "CHAT": "CHAT",
    "THREADLIST": "THREADLIST"
}

function useViewStateContainer() {
    let [containerView, setContainerView] = useState(null)
    let [displayThreadPanel, setDisplayThreadPanel] = useState(false)
    return {
        containerView, setContainerView, displayThreadPanel, setDisplayThreadPanel
    }
}

let ViewStateContainer = createContainer(useViewStateContainer)
export default ViewStateContainer
