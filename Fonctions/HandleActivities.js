export const createActivity = (name, description) => {
  return {
    name,
    description,
  };
};

export const deleteActivity = (activities, name) => {
  const updatedActivities = activities.filter(
    (activity) => activity.name !== name
  );
  return updatedActivities;
};
