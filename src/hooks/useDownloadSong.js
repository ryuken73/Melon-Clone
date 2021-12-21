import * as React from 'react';
import useSongHelper from 'hooks/useSongHelper';
import useDoFileSizeSongList from 'hooks/useDoFileSizeSongList';

const GUBUN='M';
const useDownloadSong = (songsToDownload) => {
    const {clearChecked} = useSongHelper();
    console.log('^^^', songsToDownload)
    const doGetFileSizeBatch = useDoFileSizeSongList(songsToDownload, GUBUN);
    React.useEffect(() => {
        window.DEXT5UPLOAD_FinishDownloaded = (uploadID, nDownloadItemCount) => {
            clearChecked();
        }
    },[])
    const downloadFile = React.useCallback((checkedSongList) => {
    	window.DEXT5UPLOAD.DeleteSelectedFile("chrome_downloader");
        window.doStartDownload_chrome_show();
        const refetchResult = doGetFileSizeBatch.map(getFileSize => getFileSize.refetch());
        Promise.all(refetchResult)
        .then(results => {
            results.forEach(result => {
                console.log('^^^', result)
                const {receipt_no, reg_no ,wavsize} = result.data.song_list[0];
                console.log('*************', receipt_no, reg_no, wavsize, checkedSongList)
                const songToDownload = checkedSongList.find(song => song.receipt_no === receipt_no && song.reg_no === reg_no)
                if(songToDownload){
                    const {saveTo, download_url} = songToDownload;
                    window.DEXT5UPLOAD.AddUploadedFile(receipt_no, saveTo, download_url, wavsize, '', "chrome_downloader");
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