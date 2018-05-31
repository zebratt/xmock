import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Input } from 'antd'
import classNames from 'classnames'

// types
import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/IFile'
import { AppModelClass } from '@src/store/models/AppModel'

// utils
import StorageService from '@src/utils/StorageService'

interface IAppProps {
    AppModel: AppModelClass
}

@inject('AppModel')
@observer
class App extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.AppModel.loadFileList()
    }
    fileItemClick = (file: IFile) => {
        this.props.AppModel.loadFileContent(file.id)
    }
    textAreaChange = (eve: React.SyntheticEvent<HTMLTextAreaElement>) => {
        const { AppModel } = this.props
        AppModel.updateCurrentFileContentAction(eve.currentTarget.value)
    }
    saveButtonClick = () => {
        const { AppModel } = this.props
        AppModel.saveFileContent()
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
        const currentFileId: number = AppModel.currentFileId.get()
        const content = AppModel.currentContent.get()

        if (currentFileId < 0) {
            return (
                <div className={styles.mainContainer}>
                    <div className={styles.welcome}>欢迎使用XMock</div>
                    <Button type="primary" onClick={() => {
                        StorageService.set('testKey', {name: 'callie'}).write()
                    }}>Click me to save data</Button>
                    <Button type="primary" onClick={() => {
                        const data = StorageService.get('testKey').value()
                        console.log(data)
                    }}>Click me read data</Button>
                </div>
            )
        }

        return (
            <div className={styles.mainContainer}>
                <div className={styles.menuBar}>
                    <Button type="primary" onClick={this.saveButtonClick}>
                        保存
                    </Button>
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
