const mediaService = () => {
  const MEDIA_DOMAIN = "http://localhost:2021/rest/";
  const getVideoUrl = (name) => {
    return MEDIA_DOMAIN + "video/" + name;
  };
  const getImageUrl = (name) => {
    return MEDIA_DOMAIN + "image/" + name;
  };
  return { getImageUrl, getVideoUrl };
};
module.exports = mediaService;
