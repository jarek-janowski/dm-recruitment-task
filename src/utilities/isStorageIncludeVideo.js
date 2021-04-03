const isStorageIncludeVideo = (selectedVideo, key) => {
    const storageVideos = (JSON.parse(localStorage.getItem(key)) || []).map(item => (
      item.id))
    const includes = storageVideos.includes(selectedVideo.id)
    return includes
  }

  export default isStorageIncludeVideo