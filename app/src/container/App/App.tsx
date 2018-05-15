import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'
import find from 'lodash/find'

// types
import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/IFile'

@inject('AppModel')
@observer
class App extends React.Component<any> {
    componentDidMount() {
        this.props.AppModel.loadFiles()
    }
    fileItemClick = (file: IFile) => {
        this.props.AppModel.currentFileId.set(file.id)
    }
    render() {
        const { AppModel } = this.props
        const files: IObservableArray<IFile> = AppModel.files
        const currentFileId: number = AppModel.currentFileId.get()
        const currentFile = find(files, ['id', currentFileId])
        const content = currentFile ? currentFile.content : null

        return (
            <div className={styles.app}>
                <div className={styles.menu}>
                    {files.map(file => {
                        return (
                            <div
                                key={file.id}
                                className={styles.fileItem}
                                onClick={this.fileItemClick.bind(this, file)}
                            >
                                {file.fileName}
                            </div>
                        )
                    })}
                </div>
                <div className={styles.mainContainer}>{content}</div>
            </div>
        )
    }
}

export default App
