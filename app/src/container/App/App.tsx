import styles from './App.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'

// components
import { Input, Modal } from 'antd'

// modules
import Menu from './Menu/Menu'
import Welcome from './Welcome/Welcome'
import Workspace from './Workspace/Workspace'

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

        return (
            <div className={styles.app}>
                <Menu AppModel={AppModel} newFileButtonHandler={this.newFileButtonHandler} />
                <div className={styles.mainContainer}>
                    {currentFileId < 0 ? <Welcome /> : <Workspace AppModel={AppModel} />}
                </div>
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
