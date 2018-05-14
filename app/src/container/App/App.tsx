import styles from './App.pcss'
import React from 'react'
import { IObservableArray } from 'mobx'
import { observer, inject } from 'mobx-react'

import { IFile } from '@src/types/IFile'

interface IAppProps {
    files?: IObservableArray<IFile>
}

@inject('AppModel')
@observer
class App extends React.Component<IAppProps, any> {
    componentDidMount() {
    }
    render() {
        return (
            <div className={styles.app}>
                <div className={styles.menu}>123</div>
                <div className={styles.mainContainer}>content</div>
            </div>
        )
    }
}

export default App
