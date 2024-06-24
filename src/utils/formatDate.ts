
export const formatDate = (date: Date) => {
  const parsedDate = new Date(date); // Create a Date object

  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  
  return formattedDate;
}

