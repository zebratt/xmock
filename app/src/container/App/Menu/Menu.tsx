import styles from './Menu.pcss'
import React from 'react'
import { observer, inject } from 'mobx-react'

// types
// import { AppModelClass } from '@src/store/models/AppModel'
import { IObservableArray } from 'mobx'
import { IFile } from '@src/types/IFile'

// utils
import classNames from 'classnames'

@inject('AppModel')
@observer
class Menu extends React.Component<any, any>{
    fileItemClick = (file: IFile) => {
        this.props.AppModel.loadFileContent(file.id)
    }
    render(){
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
}

export default Menu