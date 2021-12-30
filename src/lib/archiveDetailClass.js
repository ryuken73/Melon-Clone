class ArchiveDetail {
    constructor(resultGet, resultOpsGet){
        this.nativeProps.get = {...resultGet};
        this.nativeProps.ops_get = {...resultOpsGet};
    }
    get bora_archive_yn() { return this.nativeProps.get.bora_archive_yn };
    get media_id() { return this.nativeProps.get.media_id };
    get reg_dt() { return this.nativeProps.get.reg_dt };
    get ops_get() { return this.nativeProps.ops_get };
}

const createArchiveDetail = (resultGet, resultOpsGet) => {
    const archiveDetail = new ArchiveDetail(resultGet, resultOpsGet);
    return archiveDetail
}

export default createArchiveDetail;