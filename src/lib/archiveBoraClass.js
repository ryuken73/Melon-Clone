import CONSTANTS from 'config/constants';
const {BASE_BORA_STREAM_URL, SRC_TYPE} = CONSTANTS;
const isProduction = process.env.NOdE_ENV === 'production';

class ArchiveBora {
    constructor(result){
        this.nativeProps = {...result};
    }
    get id() { return this.nativeProps.asset_id };
    get asset_id() { return this.nativeProps.asset_id };
    get download_url() { return this.nativeProps.download_url };
    get file_nm() { return this.nativeProps.file_nm };
    get file_path() { return this.nativeProps.file_path };
    get streaming_url() { return this.nativeProps.streaming_url };
    get src(){
        return `${BASE_BORA_STREAM_URL}${this.file_path}`
    }
    get src_type() { return SRC_TYPE.BORA};
    get parsed() {
        return {
            id: this.id,
            asset_id: this.asset_id,
            download_url: isProduction ? this.download_url.replace('http://', 'https://') : this.download_url,
            file_nm: this.file_nm,
            file_path: this.file_path,
            streaming_url: this.streaming_url,
            src: this.src,
            src_type: this.src_type
        }
    }
}

const createArchiveBora = result => {
    const archiveBora = new ArchiveBora(result);
    return archiveBora
}

export default createArchiveBora;