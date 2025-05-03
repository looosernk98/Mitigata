// write only utility functions here in this file

export const formatDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
};

export const calculateUserStatusPercentage = (data, key) => {
  const filteredData = data?.filter((item) => item?.about?.status === key);
  const percentage = (filteredData?.length * 100) / data?.length;
  return filteredData?.length ? `${percentage.toFixed(1)}%` : "0%";
};

export const getChipLabel = (key, value) => {
  if (key === "date") {
    const [start, end] = value.split("@");
    const label =
      formatDate(new Date(start)) + " - " + formatDate(new Date(end));
    return label;
  }
  return value;
};

export const sortUserData = (userData, sortConfig) => {
  const data = [...userData];
  for (const key in sortConfig) {
    if (key === "name") {
      if (sortConfig[key] === "asc")
        data.sort((a, b) =>
          a?.about?.name
            ?.toLowerCase()
            .localeCompare(b?.about?.name?.toLowerCase())
        );
      if (sortConfig[key] === "desc")
        data.sort((a, b) =>
          b?.about?.name
            ?.toLowerCase()
            .localeCompare(a?.about?.name?.toLowerCase())
        );
    } else if (key === "email") {
      if (sortConfig[key] === "asc")
        data.sort((a, b) =>
          a?.about?.email
            ?.toLowerCase()
            .localeCompare(b?.about?.email?.toLowerCase())
        );
      if (sortConfig[key] === "desc")
        data.sort((a, b) =>
          b?.about?.email
            ?.toLowerCase()
            .localeCompare(a?.about?.email?.toLowerCase())
        );
    } else if (key === "date") {
      if (sortConfig[key] === "asc")
        data.sort(
          (a, b) =>
            new Date(a?.details?.date).getTime() -
            new Date(b?.details?.date).getTime()
        );
      if (sortConfig[key] === "desc")
        data.sort(
          (a, b) =>
            new Date(b?.details?.date).getTime() -
            new Date(a?.details?.date).getTime()
        );
    } else if (key === "status") {
      if (sortConfig[key] === "asc")
        data.sort((a, b) =>
          a?.about?.status
            ?.toLowerCase()
            .localeCompare(b?.about?.status?.toLowerCase())
        );
      if (sortConfig[key] === "desc")
        data.sort((a, b) =>
          b?.about?.status
            ?.toLowerCase()
            .localeCompare(a?.about?.status?.toLowerCase())
        );
    } else if (key === "invited_by") {
      if (sortConfig[key] === "asc")
        data.sort((a, b) =>
          a?.details?.invitedBy
            ?.toLowerCase()
            .localeCompare(b?.details?.invitedBy?.toLowerCase())
        );
      if (sortConfig[key] === "desc")
        data.sort((a, b) =>
          b?.details?.invitedBy
            ?.toLowerCase()
            .localeCompare(a?.details?.invitedBy?.toLowerCase())
        );
    } else {
      return data;
    }
  }
  return data;
};
