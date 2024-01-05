export const createActivity = (name, category) => {
  return {
    name,
    category,
  };
};

export const deleteActivity = (activities, name) => {
  const updatedActivities = activities.filter(
    (activity) => activity.name !== name
  );
  return updatedActivities;
};

export const filterActivitiesByName = (activities, searchText) => {
  return activities.filter((activity) =>
    activity.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

export const filterActivitiesByCategory = (activities, selectedCategory) => {
  if (selectedCategory === "Toutes") {
    // Si "Toutes" est sélectionné, renvoyer toutes les activités
    return activities;
  } else {
    // Sinon, filtrer les activités en fonction de la catégorie sélectionnée
    return activities.filter((activity) =>
      activity.category.includes(selectedCategory)
    );
  }
};
