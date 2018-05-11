import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'

interface IAppProps {}

@inject((store: any) => ({ ...store.AppModel }))
@observer
class App extends React.Component<IAppProps> {
    render() {
        return <div className={styles.app}>
            <div className={styles.menu}>
                123
            </div>
            <div className={styles.mainContainer}>
                content
            </div>
        </div>
    }
}

export default App
