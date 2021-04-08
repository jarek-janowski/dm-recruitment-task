const isStorageIncludeVideo = (selectedVideo: any, key: string) => {
    const storageVideos = (JSON.parse(localStorage.getItem(key)!) || []).map((item: any) => (
      item.id))
    const includes = storageVideos.includes(selectedVideo.id)
    return includes
  }

  export default isStorageIncludeVideo