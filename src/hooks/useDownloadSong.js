import * as React from 'react';
import useSongHelper from 'hooks/useSongHelper';
import useDoFileSizeSongList from 'hooks/useDoFileSizeSongList';
import useCurrentPlaylist from './useCurrentPlaylist';

const GUBUN='M';
const useDownloadSong = (songsToDownload, downloadFromPlaylist=false) => {
    const {clearChecked} = useSongHelper();
    const {clearCheckedCurrentPlayList} = useCurrentPlaylist();
    console.log('^^^', songsToDownload, downloadFromPlaylist);
    const doGetFileSizeBatch = useDoFileSizeSongList(songsToDownload, GUBUN);
    React.useEffect(() => {
        console.log('^^^^^^^ set download finish function:', downloadFromPlaylist);
        window.DEXT5UPLOAD_FinishDownloaded = (uploadID, nDownloadItemCount) => {
            console.log('^^^', uploadID);
            // if(downloadFromPlaylist){
                // clearCheckedCurrentPlayList();
            // } else {
                clearChecked();
            // }
        }
    },[clearCheckedCurrentPlayList, clearChecked, downloadFromPlaylist])
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