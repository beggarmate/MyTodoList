export default function hasSubstr(str, text) {
    const regExp = new RegExp(text, "gi");
    if (str.match(regExp)) return true;
}
