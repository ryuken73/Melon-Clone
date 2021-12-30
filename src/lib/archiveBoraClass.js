import CONSTANTS from 'config/constants';
const {BASE_BORA_STREAM_URL} = CONSTANTS;

class ArchiveBora {
    constructor(result){
        this.nativeProps = {...result};
    }
    get asset_id() { return this.nativeProps.asset_id };
    get download_url() { return this.nativeProps.download_url };
    get file_nm() { return this.nativeProps.file_nm };
    get file_path() { return this.nativeProps.file_path };
    get streaming_url() { return this.nativeProps.streaming_url };
    get src(){
        return `${BASE_BORA_STREAM_URL}${this.file_path}`
    }
}

const createArchiveBora = result => {
    const archiveBora = new ArchiveBora(result);
    return archiveBora
}

export default createArchiveBora;