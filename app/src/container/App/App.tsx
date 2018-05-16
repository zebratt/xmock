import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'
import find from 'lodash/find'
import { Button, Input } from 'antd'
import classNames from 'classnames'

// types
import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/IFile'
import {AppModelClass} from '@src/store/models/AppModel'

interface IAppProps {
    AppModel : AppModelClass
}

@inject('AppModel')
@observer
class App extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.AppModel.loadFiles()
    }
    fileItemClick = (file: IFile) => {
        this.props.AppModel.updateCurrentFileIdAction(file.id)
    }
    textAreaChange = (eve: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const { AppModel } = this.props
        AppModel.updateCurrentFileContentAction(AppModel.currentFileId.get(), eve.currentTarget.value)
    }
    saveButtonClick = () => {
        const { AppModel } = this.props
        AppModel.saveFileContent(AppModel.currentFileId.get())
    }
    renderMenu = () => {
        const { AppModel } = this.props
        const files: IObservableArray<IFile> = AppModel.files
        const currentFileId: number = AppModel.currentFileId.get()

        return (
            <div className={styles.menu}>
                {files.map(file => {
                    const fileItemStyle = classNames({
                        [styles.fileItem]: true,
                        [styles.active]: currentFileId === file.id
                    })

                    return (
                        <div key={file.id} className={fileItemStyle} onClick={this.fileItemClick.bind(this, file)}>
                            {file.fileName}
                        </div>
                    )
                })}
            </div>
        )
    }
    renderContent = () => {
        const { AppModel } = this.props
        const files: IObservableArray<IFile> = AppModel.files
        const currentFileId: number = AppModel.currentFileId.get()
        const currentFile = find(files, ['id', currentFileId])
        const content = currentFile ? currentFile.content : null

        return (
            <div className={styles.mainContainer}>
                <div className={styles.menuBar}>
                    <Button type="primary" onClick={this.saveButtonClick}>保存</Button>
                </div>
                <div className={styles.textarea}>
                    <Input.TextArea value={content} onChange={this.textAreaChange} />
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className={styles.app}>
                {this.renderMenu()}
                {this.renderContent()}
            </div>
        )
    }
}

export default App
