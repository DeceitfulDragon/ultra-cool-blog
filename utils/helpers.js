module.exports = {
    format_date: (date) => {
        // Format date
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
};