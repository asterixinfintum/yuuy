export default {
    methods: {
        truncate(str, maxLength) {
            if (str.length > maxLength) {
                return str.substring(0, maxLength) + "...";
            } else {
                return str;
            }
        },
    }
}