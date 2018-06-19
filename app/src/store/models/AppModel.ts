import { observable, action, IObservableArray, IObservableValue } from 'mobx'
import ApiService from '@src/utils/ApiService'
import { notification } from 'antd'
import { HOST } from '@src/settings'

// types
import { IFile } from '@src/types/IFile'
import { IResponse } from '@src/types/IResponse'

export class AppModelClass {
    readonly currentFileId: IObservableValue<number>
    readonly files: IObservableArray<IFile>
    readonly currentContent: IObservableValue<string>
    readonly currentURL: IObservableValue<string>

    constructor() {
        this.files = observable<IFile>([])
        this.currentFileId = observable.box<number>(-1)
        this.currentContent = observable.box<string>()
        this.currentURL = observable.box<string>()
    }
    async loadFileList() {
        const res = await ApiService.get<IResponse<Array<IFile>>>(`${HOST}/api/files/list`)

        this.loadFileListAction(res.data.d)
    }
    async updateCurrentFile() {
        await ApiService.post<IResponse<any>>(`${HOST}/api/files/${this.currentFileId.get()}/save`, {
            content: this.currentContent.get(),
            url: this.currentURL.get()
        })

        notification.success({
            message: 'Success',
            description: '保存成功！',
            duration: 1
        })
    }
    async saveNewFile(fileName: string) {
        await ApiService.post<IResponse<any>>(`${HOST}/api/files/save`, {
            fileName
        })

        notification.success({
            message: 'Success',
            description: '保存成功！',
            duration: 1
        })
    }
    async deleteCurrentFile() {
        await ApiService.get<IResponse<any>>(`${HOST}/api/files/${this.currentFileId.get()}/delete`)

        notification.success({
            message: 'Success',
            description: '删除成功！',
            duration: 1
        })
    }
    async loadFile(id: number) {
        const res = await ApiService.get<IResponse<IFile>>(`${HOST}/api/files/${id}`)

        this.loadFileAction(res.data.d)
        this.updateCurrentFileIdAction(id)
    }
    @action
    loadFileListAction(data: Array<IFile>) {
        this.files.replace(data)
    }
    @action
    loadFileAction(file: IFile) {
        this.currentContent.set(file.content)
        this.currentURL.set(file.url)
    }
    @action
    updateCurrentFileIdAction(nextId: number) {
        this.currentFileId.set(nextId)
    }
    @action
    updateCurrentFileContentAction(nContent: string) {
        this.currentContent.set(nContent)
    }
    @action
    updateCurrentURLAction(nURL: string) {
        this.currentURL.set(nURL)
    }
}

export const AppModel = new AppModelClass()
