module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    
    const formattedDate = new Date(date).toLocaleDateString();

    return formattedDate;
  }
};
