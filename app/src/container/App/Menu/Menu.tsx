import styles from './Menu.pcss'
import React from 'react'
import { observer } from 'mobx-react'
import {Button} from 'antd'

// types
import { AppModelClass } from '@src/store/models/AppModel'
import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/App/IFile'

// utils
import classNames from 'classnames'

interface IMenuProps {
    AppModel: AppModelClass,
    newFileButtonHandler(): void
}

@observer
class Menu extends React.Component<IMenuProps> {
    fileItemClick = (file: IFile) => {
        this.props.AppModel.loadFile(file.id)
    }
    render() {
        const { AppModel } = this.props
        const files: IObservableArray<IFile> = AppModel.files
        const currentFileId: number = AppModel.currentFileId.get()

        return (
            <div className={styles.menu}>
                <div className={styles.fileContent}>
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
                <div className={styles.add}>
                    <Button type="primary" onClick={this.props.newFileButtonHandler}>添加新文件</Button>
                </div>
            </div>
        )
    }
}

export default Menu
