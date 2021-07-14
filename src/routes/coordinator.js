export const goToSignUp = (history) => {
  history.replace("/signup");
};

export const goToFeed = (history) => {
  history.replace("/");
};

export const goToLogin = (history) => {
  history.replace("/login");
};

export const goToPreviousPage = (history) => {
  history.goBack();
};


export const goToCreatePhotoPage = (history) => {
  history.replace("/createphoto");
};


export const goToCreateCollectionPage = (history) => {
  history.replace("/createcollection");
};

export const goToCollectionsPage = (history) => {
  history.replace("/collections");
};