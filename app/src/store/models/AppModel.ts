import {observable, IObservableArray} from 'mobx'
import {IFile} from '@src/types/IFile'

class AppModel {
    @observable files: IObservableArray<IFile>

    constructor(){
        this.files = observable([])
    }

    loadFiles(files: Array<IFile>){
        this.files.replace(files)
    }
}

export default new AppModel()
