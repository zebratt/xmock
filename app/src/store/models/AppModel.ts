import { observable, action, IObservableArray, IObservableValue } from 'mobx'
import ApiService from '@src/utils/ApiService'
import find from 'lodash/find'
import { notification } from 'antd'

// types
import { IFile } from '@src/types/IFile'
import { IResponse } from '@src/types/IResponse'

export class AppModelClass {
    readonly currentFileId: IObservableValue<number>
    readonly files: IObservableArray<IFile>

    constructor() {
        this.files = observable<IFile>([])
        this.currentFileId = observable.box<number>(1)
    }

    async loadFiles() {
        const res = await ApiService.get<IResponse<Array<IFile>>>('//localhost:4000/api/file/all')

        this.loadFilesAction(res.data.d)
    }

    async saveFileContent(id: number) {
        const currentFile: IFile | undefined = find(this.files, ['id', id])
        const res = await ApiService.post<IResponse<any>>('//localhost:4000/api/file/save', {
            id,
            content: currentFile ? currentFile.content : ''
        })

        if (res.data.code === 0) {
            notification.success({
                message: 'Success',
                description: '保存成功！',
                duration: 1
            })
        }
    }

    @action
    loadFilesAction(data: Array<IFile>) {
        this.files.replace(data)
    }

    @action
    updateCurrentFileIdAction(nextId: number) {
        this.currentFileId.set(nextId)
    }

    @action
    updateCurrentFileContentAction(id: number, nContent: string) {
        const currentFile = find(this.files, ['id', id])

        if (currentFile) {
            currentFile.content = nContent
        }
    }
}

export const AppModel = new AppModelClass()
