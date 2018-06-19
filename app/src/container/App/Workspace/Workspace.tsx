import styles from './Workspace.pcss'
import React from 'react'
import { observer } from 'mobx-react'

// components
import { Button, Input, Modal } from 'antd'

// types
import { AppModelClass } from '@src/store/models/AppModel'

interface IWorkspaceProps {
    AppModel: AppModelClass
}

@observer
class Workspace extends React.Component<IWorkspaceProps> {
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
        const content = AppModel.currentContent.get()

        return [
            <div key="buttons" className={styles.buttons}>
                <Button type="primary" onClick={this.saveButtonClick}>
                    保存
                </Button>
                &nbsp;
                <Button type="danger" onClick={this.deleteButtonClick}>
                    删除
                </Button>
            </div>,
            <div key="textarea" className={styles.textarea}>
                <Input.TextArea value={content} onChange={this.textAreaChange} />
            </div>
        ]
    }
}

export default Workspace
