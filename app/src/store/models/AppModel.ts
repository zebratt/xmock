import { observable, action, IObservableArray, IObservableValue } from 'mobx'
import ApiService from '@src/utils/ApiService'
import { notification } from 'antd'

// types
import { IFile } from '@src/types/IFile'
import { IResponse } from '@src/types/IResponse'

export class AppModelClass {
    readonly currentFileId: IObservableValue<number>
    readonly files: IObservableArray<IFile>
    readonly currentContent: IObservableValue<string>

    constructor() {
        this.files = observable<IFile>([])
        this.currentFileId = observable.box<number>(-1)
        this.currentContent = observable.box<string>()
    }
    async loadFileList() {
        const res = await ApiService.get<IResponse<Array<IFile>>>('http://localhost:4000/api/file/list')

        this.loadFileListAction(res.data.d)
    }
    async saveFileContent() {
        const res = await ApiService.post<IResponse<any>>(
            `http://localhost:4000/api/file/${this.currentFileId.get()}/save`,
            {
                content: this.currentContent.get()
            }
        )

        if (res.data.code === 0) {
            notification.success({
                message: 'Success',
                description: '保存成功！',
                duration: 1
            })
        }
    }
    async loadFileContent(id: number) {
        const res = await ApiService.get<IResponse<string>>(`http://localhost:4000/api/file/${id}`)

        this.loadFileContentAction(res.data.d)
        this.updateCurrentFileIdAction(id)
    }
    @action
    loadFileListAction(data: Array<IFile>) {
        this.files.replace(data)
    }
    @action
    loadFileContentAction(content: string) {
        this.currentContent.set(content)
    }
    @action
    updateCurrentFileIdAction(nextId: number) {
        this.currentFileId.set(nextId)
    }

    @action
    updateCurrentFileContentAction(nContent: string) {
        this.currentContent.set(nContent)
    }
}

export const AppModel = new AppModelClass()
