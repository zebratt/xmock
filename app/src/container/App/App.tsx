import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'

interface IAppProps {}

@inject((store: any) => ({ ...store.AppModel }))
@observer
class App extends React.Component<IAppProps> {
    render() {
        return <div className={styles.app}>
            hello world
        </div>
    }
}

export default App
