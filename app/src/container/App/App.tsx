import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Input, Modal } from 'antd'
import Menu from './Menu/Menu'

// types
import { AppModelClass } from '@src/store/models/AppModel'

interface IAppProps {
    AppModel: AppModelClass
}

@inject('AppModel')
@observer
class App extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.AppModel.loadFileList()
    }
    textAreaChange = (eve: React.SyntheticEvent<HTMLTextAreaElement>) => {
        this.props.AppModel.updateCurrentFileContentAction(eve.currentTarget.value)
    }
    saveButtonClick = () => {
        this.props.AppModel.saveFileContent()
    }
    deleteButtonClick = () => {
        Modal.confirm({
            title: '提醒',
            content: '确认删除吗？',
            onOk: () => {
                this.props.AppModel.deleteCurrentFile()
                this.props.AppModel.loadFileList()
            }
        })
    }
    render() {
        const { AppModel } = this.props
        const currentFileId: number = AppModel.currentFileId.get()
        const content = AppModel.currentContent.get()

        return (
            <div className={styles.app}>
                <Menu AppModel={AppModel} />
                {currentFileId < 0 ? (
                    <div className={styles.mainContainer}>
                        <div className={styles.welcome}>欢迎使用XMock</div>
                    </div>
                ) : (
                    <div className={styles.mainContainer}>
                        <div className={styles.menuBar}>
                            <Button type="primary" onClick={this.saveButtonClick}>
                                保存
                            </Button>
                            &nbsp;
                            <Button type="danger" onClick={this.deleteButtonClick}>
                                删除
                            </Button>
                        </div>
                        <div className={styles.textarea}>
                            <Input.TextArea value={content} onChange={this.textAreaChange} />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default App
