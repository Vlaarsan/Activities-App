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
