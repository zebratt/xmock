import React from 'react'

interface ISideBarProps {
    requests: any
}

class SideBar extends React.Component<ISideBarProps, any>{
    render(){
        const {requests} = this.props

        return (
            <div></div>
        )
    }
}

export default SideBar