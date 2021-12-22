import * as React from 'react';
import { getTimeString } from 'lib/util';
import useDoFileSizeSongList from 'hooks/useDoFileSizeSongList';
import useMessageBox from './useMessageBox';

const GUBUN='M';
const useDownloadSong = (songsToDownload) => {
    const {showMessageBox} = useMessageBox();
    const doGetFileSizeBatch = useDoFileSizeSongList(songsToDownload, GUBUN);
    React.useEffect(() => {
        window.DEXT5UPLOAD_FinishDownloaded = (uploadID, nDownloadItemCount) => {
            window.fileDownloadCallback();
            showMessageBox(`${nDownloadItemCount}개 파일을 다운로드 했습니다.`)
        }
    },[])
    const downloadFile = React.useCallback((checkedSongList, callback=()=>{}) => {
        window.fileDownloadCallback = callback;
    	window.DEXT5UPLOAD.DeleteSelectedFile("chrome_downloader");
        window.doStartDownload_chrome_show();
        const refetchResult = doGetFileSizeBatch.map(getFileSize => getFileSize.refetch());
        Promise.all(refetchResult)
        .then(results => {
            results.forEach(result => {
                // console.log('@@@:',result.data)
                const {receipt_no, reg_no ,wavsize} = result.data.song_list[0];
                console.log('*************', receipt_no, reg_no, wavsize, checkedSongList)
                const songToDownload = checkedSongList.find(song => song.receipt_no === receipt_no && song.reg_no === reg_no)
                if(songToDownload){
                    const {saveTo, download_url} = songToDownload;
                    const now = new Date();
                    const saveToWithCurrentTime = saveTo.replace('hhmmss', getTimeString(now));
                    window.DEXT5UPLOAD.AddUploadedFile(receipt_no, saveToWithCurrentTime, download_url, wavsize, '', "chrome_downloader");
                }
            })
            window.DEXT5UPLOAD.SetSelectItem('-1', '1', 'chrome_downloader');
            window.DEXT5UPLOAD.DownloadAllFile("chrome_downloader");
        })
        .catch(err => {
            console.error(err);
        })
    },[doGetFileSizeBatch])
    return downloadFile;
} 

export default useDownloadSong;