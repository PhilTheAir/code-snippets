var resData = (jsonData) => {
  return jsonData.filter(function (value) {
    return value.drm && value.episodeCount > 0;
  })
  .map(function (value) {
    return {
      image: value.image.showImage,
      slug: value.slug,
      title: value.title };
  });
};

exports.resData = resData;