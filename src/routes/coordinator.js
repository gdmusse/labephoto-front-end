export const goToSignUp = (history) => {
  history.push("/signup");
};

export const goToFeed = (history) => {
  history.push("/");
};

export const goToLogin = (history) => {
  history.push("/login");
};

export const goToPreviousPage = (history) => {
  history.goBack();
};


export const goToCreatePhotoPage = (history) => {
  history.push("/createphoto");
};


export const goToCreateCollectionPage = (history) => {
  history.push("/createcollection");
};

export const goToCollectionsPage = (history) => {
  history.push("/collections");
};

export const goToCollectionDetailsPage = (history, id) => {
  history.push(`/collection/${id}`);
};
