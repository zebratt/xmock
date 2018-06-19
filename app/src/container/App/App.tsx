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

interface IAppState {
    showAddModel: boolean
    newFileNameValue: string
}

@inject('AppModel')
@observer
class App extends React.Component<IAppProps, IAppState> {
    state = {
        showAddModel: false,
        newFileNameValue: ''
    }
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
    modalConfirmClick = () => {
        const { newFileNameValue } = this.state

        if (newFileNameValue) {
            this.props.AppModel.saveNewFile(newFileNameValue)
            this.props.AppModel.loadFileList()

            this.setState({
                newFileNameValue: '',
                showAddModel: false
            })
        }
    }
    modalCancelClick = () => {
        this.setState({
            newFileNameValue: '',
            showAddModel: false
        })
    }
    newFileNameValueChange = (eve: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            newFileNameValue: eve.currentTarget.value
        })
    }
    newFileButtonHandler = () => {
        this.setState({
            showAddModel: true
        })
    }
    render() {
        const { AppModel } = this.props
        const { showAddModel, newFileNameValue } = this.state
        const currentFileId: number = AppModel.currentFileId.get()
        const content = AppModel.currentContent.get()

        return (
            <div className={styles.app}>
                <Menu AppModel={AppModel} newFileButtonHandler={this.newFileButtonHandler} />
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
                <Modal
                    visible={showAddModel}
                    title="请输入新文件名称"
                    onOk={this.modalConfirmClick}
                    onCancel={this.modalCancelClick}
                >
                    <Input value={newFileNameValue} onChange={this.newFileNameValueChange} />
                </Modal>
            </div>
        )
    }
}

export default App
