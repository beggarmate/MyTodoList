export default function getLocaleDate(date) {
    if (!date) return;

    const locale = navigator.language;
    const dateOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const userDateFormat = new Intl.DateTimeFormat(locale, dateOptions);

    return userDateFormat.format(date);
}
