export const createActivity = (name, description) => {
  return {
    name,
    description,
  };
};

export const deleteActivity = (activities, name) => {
  // Utiliser la fonction filter pour créer un nouveau tableau sans l'activité à supprimer
  const updatedActivities = activities.filter(
    (activity) => activity.name !== name
  );

  // Retourner le nouveau tableau d'activités
  return updatedActivities;
};
