import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'

import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/IFile'

@inject('AppModel')
@observer
class App extends React.Component<any> {
    componentDidMount() {
        this.props.AppModel.loadFiles()
    }
    fileItemClick = (file: IFile) => {
        console.log(file);
    }
    render() {
        const { AppModel } = this.props
        const files: IObservableArray<IFile> = AppModel.files
        const current: IFile = AppModel.current

        return (
            <div className={styles.app}>
                <div className={styles.menu}>
                    {files.map(file => {
                        return (
                            <div key={file.id} className={styles.fileItem} onClick={this.fileItemClick.bind(this, file)}>
                                {file.fileName}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.mainContainer}>{current}</div>
            </div>
        )
    }
}

export default App
