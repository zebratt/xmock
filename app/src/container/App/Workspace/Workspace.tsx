import styles from './Workspace.pcss'
import React from 'react'
import { observer } from 'mobx-react'

// components
import { Button, Input, Modal, Form } from 'antd'

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
    URLChange = (eve: React.SyntheticEvent<HTMLInputElement>) => {
        this.props.AppModel.updateCurrentURLAction(eve.currentTarget.value)
    }
    saveButtonClick = () => {
        this.props.AppModel.updateCurrentFile()
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
        const URL = AppModel.currentURL.get()
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        }

        return (
            <Form className={styles.form}>
                <div className={styles.buttons}>
                    <Button type="primary" onClick={this.saveButtonClick}>
                        保存
                    </Button>
                    &nbsp;
                    <Button type="danger" onClick={this.deleteButtonClick}>
                        删除
                    </Button>
                </div>
                <div className={styles.inputUrl}>
                    <Form.Item {...formItemLayout} label="URL:">
                        <Input value={URL} onChange={this.URLChange} />
                    </Form.Item>
                </div>
                <div className={styles.textarea}>
                    <Input.TextArea value={content} onChange={this.textAreaChange} />
                </div>
            </Form>
        )
    }
}

export default Workspace
